const args = ["start"];
const opts = { stdio: "inherit", cwd: "client", shell: true };
require("child_process").spawn("npm", args, opts);
// The emcee's control panel
require("child_process").spawn("open", [
  '-n -a "Google Chrome" --args "--new-window" "--pinned-tab-count=2" http://localhost:3000/live http://localhost:3000/remote http://localhost:3000'
]);
