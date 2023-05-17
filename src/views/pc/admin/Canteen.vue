<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form ref="canteenForm" :inline="true" :rules="rules" :model="canteenForm" label-width="80px">
        <el-form-item label="食堂" prop="canteenName">
          <el-input placeholder="请输入食堂名称" v-model="canteenForm.canteenName"></el-input>
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
          :data="canteenData"
          style="width: 100%">
        <el-table-column
            label="序号"
            width="auto">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="canteenName"
            label="食堂"
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
  </div>
</template>
<script>
import {addCanteen, deleteCanteen, getCanteenList, updateCanteen} from "@/api";

export default {
  data(){
    return{
      dialogVisible: false,
      canteenForm: {
        canteenName: ""
      },
      rules: {
        canteenName: [
          {required: true, message: '请输入食堂名称'}
        ]
      },
      canteenData: [],
      modalType: 0, //0表示新增，1表示编辑
    }
  },
  methods: {
    //新增菜品分类
    submit(){
      this.$refs.canteenForm.validate((valid) => {
        if (valid){
          if (this.modalType === 0){
            //处理数据
            addCanteen(this.canteenForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: "success"
              })
              this.getList()
              this.handleClose()
            })
          }else{
            //处理数据
            updateCanteen(this.canteenForm).then((data) =>{
              this.$message({
                message: data.data.data,
                type: "success"
              })
              this.getList()
              this.handleClose()
            })
          }
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
      this.canteenForm = JSON.parse(JSON.stringify(row))
    },
    //删除按钮
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCanteen({params: {id: row.id}}).then((data) =>{
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
      this.$refs.canteenForm.resetFields()
      this.dialogVisible = false
    },
    //弹窗点取消
    cancel(){
      this.handleClose()
    },
    //查询所有
    getList(){
      getCanteenList().then((data) =>{``
        this.canteenData = data.data.data
      })
    },
  },
  created() {
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
  }
}
</style>