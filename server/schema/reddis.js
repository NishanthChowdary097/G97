class chennakesavareddy{
  constructor(){
      this.client = require('redis').createClient({url:process.env.REDIS_URL});
  };

  async start(){
    // this.client = require('redis').createClient({url:process.env.REDIS_URL});
    this.client.connect();
    console.log("caching ready");
  };

  async stop(){
    this.client.quit();
  };

  async nodeRedisDemo() {
    try {
      await this.client.set('mykey', 'Hello from node redis');
      const myKeyValue = await this.client.get('mykey');
      console.log(myKeyValue);
      const numAdded = await this.client.zAdd("vehicles", [
        {
          score: 4,
          value: "car",
        },
        {
          score: 2,
          value: "bike",
        },
      ]);
        console.log(`Added ${numAdded} items.`);
    
        for await (const { score, value } of this.client.zScanIterator('vehicles')) {
          console.log(`${value} -> ${score}`);
        }
    
      } catch (e) {
        console.error(e);
    }
  };

  async addrecipe(id,ingred){
    ingred.forEach(async i =>  {
      await this.client.lPush(id,i)
    })
    this.client.expire(id,process.env.REDIS_EXPIRE);
    return "done"
  };

  async getrecipe(id){
    try{
      const ingred = await this.client.lRange(id,0,-1);
      this.client.expire(id,process.env.REDIS_EXPIRE);
      if(ingred.length == 0){
        return "no recipe found"
      }
      return ingred;
    }catch(e){
      console.log(e);
      return "error"
    }
  };

  async exists(id){
    if(await this.client.exists(id)){
      return true;
    }else{
      return false;
    }
  };

  async flushal(){
    await this.client.FLUSHALL();
    return "done"
  };

  async keys(){
    const keys = await this.client.KEYS("*");
    return keys;
  };

}

module.exports=chennakesavareddy;