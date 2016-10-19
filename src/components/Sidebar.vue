<template>
  <div class="sidebar">
    <div class="sidebar-header"></div>
    <ul>
      <li v-for="(file,index) in fileObjList"
          :class="{active:activeFileIndex===index}"
          @click="selectActive(index)">
        <div class="sidebar-item-title">{{file.title}}</div>
        <div class="sidebar-item-option"
             @click.stop="deleteFile(index)">
          <i class="iconfont">&#xe60b;</i>
        </div>
      </li>
    </ul>
    <div class="sidebar-footer" @click="createFile">
      New
    </div>
  </div>
</template>

<script>
  export default{
    props: ['fileList', 'activeFileIndex'],
    methods: {
      selectActive: function (index) {
        this.$emit('active', index)
      },
      createFile: function () {
        this.$emit('create')
      }, deleteFile: function (index) {
        this.$emit('delete', index)
      }
    },
    computed: {
      fileObjList: function () {
        return this.fileList.map((file) => {
          let title = file.content.split('\n')[0]
          return {
            title: title || 'New File'
          }
        })
      }
    }
  }
</script>
<style scoped>
  .sidebar {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    background-color: #546072;
    color: #CCC;
  }

  .sidebar-header {
    position: relative;
    z-index: 1;
    height: 50px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    background-color: #475160;
  }

  .sidebar-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    border-top: 1px solid #444;
  }

  .sidebar-footer:hover {
    cursor: pointer;
    background-color: #475160;
  }

  .sidebar ul {
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0;
    overflow-y: auto;
  }

  .sidebar ul::-webkit-scrollbar {
    display: block;
    width: 8px;
    background: #546072;
  }

  .sidebar ul::-webkit-scrollbar-thumb {
    background: #3b434e;
  }

  .sidebar ul li {
    height: 50px;
    line-height: 50px;
    list-style: none;
  }

  .sidebar ul li.active {
    background-color: #74b936 !important;
  }

  .sidebar ul li:hover {
    cursor: pointer;
    background-color: #475160;
    box-shadow: inset 0 0px 1px rgba(0, 0, 0, 0.5);
  }

  .sidebar-item-title {
    float: left;
    box-sizing: border-box;
    width: 80%;
    padding-left: 20px;

    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li.active .sidebar-item-title {
    color: #ffffff;
  }

  .sidebar-item-option {
    float: right;
    box-sizing: border-box;
    width: 20%;
    padding-right: 20px;
    text-align: right;
    visibility: hidden;
  }

  .sidebar ul li:hover .sidebar-item-option,
  li.active .sidebar-item-option {
    visibility: visible;
  }

  .sidebar-item-option:hover {
    color: #FFF;
  }


</style>
