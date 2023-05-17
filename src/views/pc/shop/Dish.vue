<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form ref="dishForm" :inline="true" :rules="rules" :model="dishForm" label-width="80px">
        <el-form-item label="菜品名称" prop="dishName">
          <el-input placeholder="请输入菜品名称" v-model="dishForm.dishName"></el-input>
        </el-form-item>
        <el-form-item label="菜品分类" prop="categoryName">
          <el-select v-model="dishForm.categoryId" placeholder="请选择">
            <el-option
                v-for="item in categoryData"
                :key="item.id"
                :label="item.categoryName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品价格" prop="price">
          <el-input placeholder="请输入菜品价格" v-model="dishForm.price"></el-input>
        </el-form-item>
        <el-form-item label="权重" prop="weight">
          <el-input placeholder="请设置权重" v-model="dishForm.weight"></el-input>
        </el-form-item>
        <el-form-item label="菜品图片" prop="image">
          <el-input placeholder="菜品图片" v-model="dishForm.image"></el-input>
        </el-form-item>
        <el-form-item label="菜品描述" prop="description">
          <el-input placeholder="菜品描述，最多200字" v-model="dishForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary">
        +  新增
      </el-button>
    </div>
    <div class="common-table">
      <el-table
          height="90%"
          :data="dishData"
          style="width: 100%">
        <el-table-column
            prop="dishName"
            label="菜品名称"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="image"
            label="图片"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="categoryName"
            label="菜品分类"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="price"
            label="售价"
            width="auto">
        </el-table-column>
        <el-table-column
            prop="status"
            label="售卖状态"
            width="auto">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleChange(scope.$index, scope.row)">{{scope.row.status == 1 ? "停售" : "起售"}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
            prop="weight"
            label="权重"
            width="auto">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { addDish,deleteDish,updateDish,getDishPage,getCategoryAll } from '@/api/index'
export default {
  data(){
    return{
      dialogVisible: false,
      dishForm: {
        dishName: "",
        categoryId: "",
        price: "",
        weight: "",
        image: "",
        description: "",
        shopId: ""
      },
      rules: {
        dishName: [
          {required: true, message: '请输入菜品名称'}
        ],
        categoryId: [
          {required: true, message: '请输入菜品分类',}
        ],
        price: [
          {required: true, message: '请输入菜品价格'}
        ],
        weight: [
          {required: true, message: '请输入权重值'},
        ]
      },
      dishData: [],
      modalType: 0, //0表示新增，1表示编辑
      pageData: {
        page: 1,
        pageSize: 10,
        name: "",
        shopId: ""
      },
      total: 0,
      categoryData: []
    }
  },
  methods: {
    //新增菜品分类
    submit(){
      this.$refs.dishForm.validate((valid) => {
        if (valid){
          if (this.modalType === 0){
            //处理数据
            addDish(this.dishForm).then((data)=>{
              this.$message({
                message: data.data.data,
                type: 'success'
              });
            })
          }else{
            //处理数据
            updateDish(this.dishForm).then((data)=>{
              this.$message({
                message: data.data.data,
                type: 'success'
              });
            })
          }
          //关闭弹窗
          this.dialogVisible = false
          //刷新
          location.reload()
        }
      })
    },
    //新增按钮
    handleAdd(){
      this.dishForm.shopId = this.$store.state.shop.shop.info.id
      getCategoryAll({params: {shopId: this.dishForm.shopId}}).then((data) =>{
        this.categoryData = data.data.data
      })
      this.dialogVisible = true
      this.modalType = 0
    },
    //编辑按钮
    handleEdit(index,row){
      this.dialogVisible = true
      this.modalType = 1
      //对当前行数据进行深拷贝
      this.dishForm = JSON.parse(JSON.stringify(row))
    },
    //删除按钮
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDish({params: {id: row.id}}).then((data) =>{
          if (data.data.code == 1){
            this.$message({
              type: 'success',
              message: data.data.data
            })
          }else {
            this.$message({
              type: 'warning',
              message: data.data.msg
            })
          }
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //弹窗关闭的时候
    handleClose(){
      this.$refs.dishForm.resetFields()
      this.dialogVisible = false
    },
    //弹窗点取消
    cancel(){
      this.handleClose()
    },
    //起售或停售
    handleChange(index,row){
      if (row.status == 1){
        row.status = 0
      }else {
        row.status = 1
      }
      updateDish({status: row.status,id: row.id}).then(() =>{
        this.$message({
          type: 'success',
          message: '修改成功'
        });
      })
    },
    //查询所有
    getList(){
      this.pageData.shopId = this.$store.state.shop.shop.info.id
      getDishPage({params: this.pageData}).then(({ data }) =>{
        this.dishData = data.data.records
        this.total = data.data.total || 0
      })
    },
    //回调选择的页面
    handlePage(val){
      this.pageData.page = val
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.manage{
  height: 90%;
  .common-table{
    position: relative;
    height: calc(100% - 62px);
    .pager{
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>