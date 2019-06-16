import VueCookies from "vue-cookies";

export default function({ redirect }) {
  if (VueCookies.isKey("user") && !VueCookies.isKey("user.type")) {
    console.warn("Logged out because no user.type cookie");
    VueCookies.remove("user");
    VueCookies.remove("user.type");
    VueCookies.remove("user.id");
    return redirect("/?forcedLogOut=1");
  }

  if (VueCookies.isKey("user") && !VueCookies.isKey("user.id")) {
    console.warn("Logged out because no user.id cookie");
    VueCookies.remove("user");
    VueCookies.remove("user.type");
    VueCookies.remove("user.id");
    return redirect("/?forcedLogOut=1");
  }

  if (!VueCookies.isKey("user")) {
    console.warn("Redirected non authenticated user");
    VueCookies.remove("user");
    VueCookies.remove("user.type");
    VueCookies.remove("user.id");
    return redirect("/");
  }
}
