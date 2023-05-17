<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form ref="categoryForm" :inline="true" :rules="rules" :model="categoryForm" label-width="80px">
        <el-form-item label="菜品分类" prop="categoryName">
          <el-input placeholder="请输入菜品分类" v-model="categoryForm.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="权重" prop="weight">
          <el-input placeholder="请设置权重" v-model="categoryForm.weight"></el-input>
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
          :data="categoryData"
          style="width: 100%">
        <el-table-column
            label="序号"
            width="auto">
          <template slot-scope="scope">
            <span>{{ scope.$index + pageData.page*10 -9 }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="categoryName"
            label="菜品分类"
            width="auto">
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
import { addCategory,deleteCategory,updateCategory,getCategoryPage } from '@/api/index'
export default {
  data(){
    return{
      dialogVisible: false,
      categoryForm: {
        categoryName: "",
        weight: "",
        shopId: ""
      },
      rules: {
        categoryName: [
            {required: true, message: '请输入菜品分类'}
        ],
        weight: [
          {required: true, message: '请输入权重值'},
          //{type: 'number', message: '权重必须为数字值'}
        ]
      },
      categoryData: [],
      modalType: 0, //0表示新增，1表示编辑
      pageData: {
        page: 1,
        pageSize: 10,
        shopId: ""
      },
      total: 0
    }
  },
  methods: {
    //新增菜品分类
    submit(){
      this.categoryForm.shopId = this.$store.state.shop.shop.info.id
      this.$refs.categoryForm.validate((valid) => {
        if (valid){
          if (this.modalType === 0){
            //处理数据
            addCategory(this.categoryForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: "success"
              })
              this.getList()
            })
          }else{
            //处理数据
            updateCategory(this.categoryForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: "success"
              })
              this.getList()
            })
          }
          //清空表单
          this.$refs.categoryForm.resetFields()
          //关闭弹窗
          this.dialogVisible = false
        }
      })
    },
    //新增按钮
    handleAdd(){
      this.dialogVisible = true
      this.modalType = 0
    },
    //编辑按钮
    handleEdit(index,row){
      this.dialogVisible = true
      this.modalType = 1
      //对当前行数据进行深拷贝
      this.categoryForm = JSON.parse(JSON.stringify(row))
    },
    //删除按钮
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory({params: {id: row.id}}).then((data) =>{
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
      this.$refs.categoryForm.resetFields()
      this.dialogVisible = false
    },
    //弹窗点取消
    cancel(){
      this.handleClose()
    },
    //查询所有
    getList(){
      this.pageData.shopId = this.$store.state.shop.shop.info.id
      getCategoryPage({params: this.pageData}).then(({ data }) =>{
        this.categoryData = data.data.records
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