<template>
  <div class="page-body">
    <div class="card-component">
      <div class="card-outer">
        <div class="title card">{{name}}</div>
      </div>
      <div class="card-outer">
        <div class="card">
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(item, index) in itemList" :name="index" :key="item.id">
              <template slot="title">
                <div class="item-title">
                  <span class="item-name">{{item.name}}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="item-time">{{item.time}}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="item-price">{{item.price}} 元</span>
                </div>
              </template>
              <div class="item-description">{{item.description}}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ItemDetail',
    data() {
      return {
        name: '收费明细表',
        itemList: [],
        activeNames: [],
      }
    },
    created() {
      this.getItems()
    },
    methods: {
      getItems: function() {
        this.axios
          .get('/api/item/list')
          .then(res => {
            console.log(res)
            this.itemList = res.data
          })
      }
    }
  }
</script>

<style scoped>
  .page-body {
    min-height: calc(100vh - 120px);
  }

  .card-component {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    padding: 40px 0;
  }

  .card-outer {
    padding: 20px;
  }

  .card {
    background-color: white;
    padding: 20px;
    color: #34495e;
    border-radius: 5px;
    box-shadow: 0 10px 30px rgba(5,50,93,0.02), 0 5px 20px rgba(0,0,0,0.04);
    transition-duration: 0.5s;
    line-height: 1.5em;
    overflow: hidden;
  }

  .title {
    text-align: center;
    font-size: x-large;
    line-height: 60px;
    height: 60px;
    color: #34495e !important;
  }

  .item-title {
    margin-left: 10px;
    font-size: medium;
  }

  .item-name {
    margin-right: 10px;
  }

  .item-time {
    font-size: small;
    margin-left: 10px;
    margin-right: 10px;
  }

  .item-price {
    font-size: small;
    margin-left: 10px;
  }

  .item-description {
    padding: 10px;
    font-size: 14px;
  }

</style>
