import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"

// Custom condition: "index" — component chỉ render trên trang chủ
// (builtin chỉ có "not-index"; bổ sung chiều ngược lại cho recent-notes)
registerCondition("index", (props) => props.fileData.slug === "index")

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
