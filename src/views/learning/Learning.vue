<template>
  <div class="page-body">
    <div class="card-component animate__animated animate__fadeInUp">
      <div class="button-card">
        <div @click="handleClick('diseaseStudy')">病种学习</div>
      </div>
      <div class="button-card">
        <div @click="handleClick('diseaseCaseStudy')">病例学习</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Learning',
    methods: {
      handleClick: function(name) {
        if (name === 'diseaseStudy') {
          this.$router.push('/diseaseStudy')
        } else if (name === 'diseaseCaseStudy') {
          this.$router.push('/diseaseCaseStudy')
        }
      }
    }
  }
</script>

<style scoped>
.page-body {
  text-align: center;
  display: flow-root;
}

.card-component {
  margin-top: 30vh;
}

.button-card {
  background-color: white;
  display: inline-block;
  width: 15vw;
  max-width: 250px;
  margin: 20px 40px;
  padding: 20px;
  font-size: larger;
  color: #34495e;
  height: 80px;
  line-height: 80px;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgba(5,50,93,0.03), 0 5px 15px rgba(0,0,0,0.07);
  transition-duration: 0.5s;
}

.button-card:hover {
  transform: translateY(-8px);
  cursor: pointer;
  box-shadow: 0 20px 50px rgba(5,50,93,0.08), 0 10px 30px rgba(0,0,0,0.12);
}
</style>
