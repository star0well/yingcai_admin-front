const goods = () => import("@/views/main/goods/goods.vue");
export default {
  path:"/main/goods/goods",
  name: "goods", 
  component:goods, 
  children: [] 
};
