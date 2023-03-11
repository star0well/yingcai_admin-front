const user = () => import("@/views/main/user/user.vue");
export default {
  path:"/main/user/user",
  name: "user", 
  component:user, 
  children: [] 
};
