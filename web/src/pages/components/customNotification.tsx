import Notify from "simple-notify";

export const customNotification = (
  status: number,
  cls = "error",
  msg: string
) => {
  const notificationType: "success" | "error" =
    cls === "error" ? "error" : "success";

  new Notify({
    status: notificationType,
    title: msg,
    effect: "slide",
    type: "filled",
  });
};
