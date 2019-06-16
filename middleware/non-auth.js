import VueCookies from "vue-cookies";

export default function({ redirect }) {
  if (VueCookies.isKey("user")) {
    console.warn("Redirected authenticated user");
    return redirect("/mainscreen");
  }

  VueCookies.remove("user.type");
  VueCookies.remove("user.id");
}
