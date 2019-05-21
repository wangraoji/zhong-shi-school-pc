import {
    Row, Col,
    Dialog,
    Button,
    Tabs,TabPane,
    Select,Option,
    Form,FormItem,
    Radio,RadioGroup,
    Input,InputNumber,
    Table,TableColumn,
    DatePicker,TimePicker,
    Container, Aside, Main,
    Checkbox,CheckboxGroup,
    Menu, Submenu,MenuItem,MenuItemGroup,

} from 'element-ui'
const locale = require('element-ui/lib/locale/lang/zh-CN');
const element = {
    install: function (Vue: any) {
        Vue.prototype.$ELEMENT = { size: 'mini', locale: locale.default };
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Dialog)
        Vue.use(Button)
        Vue.use(Tabs)
        Vue.use(TabPane)
        Vue.use(Container)
        Vue.use(Aside)
        Vue.use(Main)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(DatePicker)
        Vue.use(TimePicker)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Radio)
        Vue.use(RadioGroup)
        Vue.use(Input)
        Vue.use(InputNumber)
        Vue.use(Checkbox)
        Vue.use(CheckboxGroup)
        Vue.use(Menu)
        Vue.use(Submenu)
        Vue.use(MenuItem)
        Vue.use(MenuItemGroup)
    }
}
export default element