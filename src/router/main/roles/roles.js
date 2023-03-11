const roles = () => import("@/views/main/roles/roles.vue");
export default {
  path:"/main/roles/roles",
  name: "roles", 
  component:roles, 
  children: [] 
};
