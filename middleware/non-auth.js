import VueCookies from "vue-cookies";

export default function({ redirect }) {
  VueCookies.remove("user.type");
  VueCookies.remove("user.id");

  if (VueCookies.isKey("user")) {
    console.warn("Redirected authenticated user");
    return redirect("/mainscreen");
  }
}
