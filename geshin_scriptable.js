//原神widget

const mihoyoCookie = ""

//背景色
const lightModeWidgetColor  = "F4F4F4"
const darkModeWidgetColor   = "252527"

//控件背景色
const darkModeLightColor    = "dfd7c2"//"d44848"
const darkModeDeepColor     = "5f766a"//"1e2732"
const lightModeLightColor   = "F4F1E8"
const lightModeDeepColor    = "E9E2D7"

//警告色
const darkModeLightAlertColor   = "E36B64"
const darkModeDeepAlertColor    = "B53C35"
const lightModeLightAlertColor  = darkModeLightAlertColor
const lightModeDeepAlertColor   = darkModeDeepAlertColor

const widgetBackgroundColor     = Color.dynamic(new Color(lightModeWidgetColor, 1.0), new Color(darkModeWidgetColor, 1.0))

const backgroundColor           = Color.dynamic(new Color(lightModeLightColor, 1.0), new Color(darkModeDeepColor, 1.0))
const subBackgroundColor        = Color.dynamic(new Color(lightModeDeepColor, 1.0), new Color(darkModeLightColor, 1.0))
const lineColor                 = Color.dynamic(new Color(lightModeDeepColor, 1.0), new Color(darkModeLightColor, 1.0))

const titleTextColor            = Color.dynamic(new Color("625E5D", 1.0), new Color("eeeeee", 1.0))
const subTitleTextColor         = Color.dynamic(new Color("C4B8A7", 1.0), new Color("cccccc", 1.0))
const descriptionTextColor      = Color.dynamic(new Color("795D50", 1.0), new Color("333333", 1.0))

const subAlertColor             = Color.dynamic(new Color(lightModeDeepAlertColor, 1.0), new Color(darkModeLightAlertColor, 1.0))
const alertColor                = Color.dynamic(new Color(lightModeLightAlertColor, 1.0), new Color(darkModeDeepAlertColor, 1.0))

const imageBorderColor          = Color.dynamic(new Color("DA9E58", 1.0), new Color("DA9E58", 1.0))

const coinImageUrl          = "https://uploadstatic.mihoyo.com/ys-obc/2021/07/15/75276545/3c9e107754da8858b9a97f6b187b55a7_8549944162621642512.png?x-oss-process=image/quality,q_75/resize,s_96"
const resinImageUrl         = "https://uploadstatic.mihoyo.com/ys-obc/2021/07/15/75276545/b3572dc1c61981a662d7523103dcc4fa_8505906760983331750.png?x-oss-process=image/quality,q_75/resize,s_96"
const taskImageUrl          = "https://uploadstatic.mihoyo.com/ys-obc/2021/07/15/75276545/02598df1fb9d3c8e420273c460ac946a_8267293389953062911.png?x-oss-process=image/quality,q_75/resize,s_96"
const bossImageUrl          = "https://uploadstatic.mihoyo.com/ys-obc/2021/07/15/75276545/c2b219874b51bd52aec7e793c9cfbd0e_6371863560482907257.png?x-oss-process=image/quality,q_75/resize,s_96"
const expenditionImageUrl   = "https://uploadstatic.mihoyo.com/ys-obc/2021/07/15/75276545/14ac5093fc9f48a54b0f6a362be8a61f_8273290538659802269.png?x-oss-process=image/quality,q_75/resize,s_96"
const transformerImageUrl   = "https://uploadstatic.mihoyo.com/ys-obc/2021/07/15/75276545/6ea098596332f6cec739632b1898f261_4937104021912138218.png?x-oss-process=image/quality,q_75/resize,s_96"
const genshinLogoImageUrl   = "https://bbs.mihoyo.com/_nuxt/img/game-ys.dfc535b.jpg"

async function main() {
    try { //添加运行错误提示
        if (!config.runsInWidget) { //测试时展示
//       let widget = await widgetWithFamily('small',true)
//       widget.presentSmall()
            let widget = await widgetWithFamily('medium',true)
            widget.presentMedium()
          // let widget = await widgetWithFamily('large',false)
            // widget.presentLarge()
            // let widget = await widgetWithFamily('extraLarge',false)
            // widget.presentExtraLarge()
        }else{
            let widget = await widgetWithFamily(config.widgetFamily,Device.isPhone())
            Script.setWidget(widget)
        }
    } catch (err) {
        console.log(err)
        let widget = new ListWidget()
        widget.addText("运行异常")
        Script.setWidget(widget)
        return
    }
}

async function widgetWithFamily(widgetFamily,isPhone) {
    if (widgetFamily == 'small') {
        return createSmallWidget()
    } else if (widgetFamily == 'medium') {
        return createMediumWidget()
    } else if (widgetFamily == 'large') {
        return createLargeWidget()
    } else if (widgetFamily == 'extraLarge') {
        return createExtraLargeWidget()
    }

    let widget = new ListWidget()
    widget.addText("不支持的尺寸")
    return widget
}

await main()
Script.complete()

async function createHeader(widget, size) {
    let imageSize = Math.min(24, size.height)
    var stack = widget.addStack()
    stack.centerAlignContent()
    stack.size = size

    // 添加原神图标
    var req = new Request(genshinLogoImageUrl)
    req.method = 'GET'
    var stackImgItem = stack.addImage(await req.loadImage())
    stackImgItem.imageSize = new Size(imageSize, imageSize)
    stackImgItem.cornerRadius = 12
    stack.addSpacer(4)

    // 添加原神标题
    var textItem = stack.addText("实时便笺")
    textItem.font = getFont('bold', Math.min(16, imageSize - 8))
    textItem.textColor = titleTextColor
    textItem.minimumScaleFactor = 0.1
    textItem.lineLimit = 1

    // 添加更新时间
    stack.addSpacer()
    var myDate = new Date();
    var textItem = stack.addText(`更新于 ${myDate.getHours().toString().padStart(2, '0')}:${myDate.getMinutes().toString().padStart(2, '0')}`)
    textItem.font = getFont('light', Math.min(16, imageSize - 10))
    textItem.textColor = subTitleTextColor
    textItem.rightAlignText()
    textItem.minimumScaleFactor = 0.1
    textItem.lineLimit = 1
    return
}
async function createSmallHeader(widget, size) {
    var stack = widget.addStack()
    stack.size = size

    // 添加更新时间
    stack.addSpacer()
    var myDate = new Date();
    var textItem = stack.addText(`更新于 ${myDate.getHours().toString().padStart(2, '0')}:${myDate.getMinutes().toString().padStart(2, '0')}`)
    textItem.font = getFont('light', Math.min(size.height - 2, 12))
    textItem.textColor = subTitleTextColor
    textItem.rightAlignText()
    textItem.minimumScaleFactor = 0.1
    textItem.lineLimit = 1
    return
}

async function createExpeditionView(widegt, size, expedition) {
    var view = widegt.addStack()
    view.layoutVertically()
    view.size = size

    var req = new Request(expedition["avatar_side_icon"])
    req.method = 'GET'

    let imageSize = new Size(size.width, size.width)
    let imageWidth = imageSize.width * 128.0 / 110.0 * Device.screenScale()
    let imageHeight = imageSize.height * 128.0 / 110.0 * Device.screenScale()
    let backgroundWidth = imageSize.width * 96.0 / 110.0 * Device.screenScale()
    let backgroundHeight = imageSize.height * 96.0 / 110.0 * Device.screenScale()
    let backgroundRect = new Rect((imageSize.width * Device.screenScale() - backgroundWidth) / 2, imageSize.height * Device.screenScale() - backgroundHeight, backgroundWidth, backgroundHeight)
    let lineWidth = 8
    let lineMargin = 4
    let borderRect = new Rect(backgroundRect.x + (lineMargin + lineWidth), backgroundRect.y + (lineMargin + lineWidth), backgroundRect.width - (lineMargin + lineWidth) * 2, backgroundRect.height - (lineMargin + lineWidth) * 2)

    let context = new DrawContext()
    context.size = new Size(imageSize.width * Device.screenScale(), imageSize.height * Device.screenScale())
    context.respectScreenScale = true
    context.opaque = false
    context.setLineWidth(lineWidth)

    context.setStrokeColor(imageBorderColor)
    var borderPath = new Path()
    borderPath.addRoundedRect(borderRect, borderRect.width / 2, borderRect.height / 2)
    context.addPath(borderPath)
    context.strokePath()

    context.drawImageInRect(await req.loadImage(), new Rect((imageSize.width * Device.screenScale() - imageWidth) / 2, imageSize.height * Device.screenScale() - imageHeight * 1.08, imageWidth, imageHeight))

    var imageView = view.addImage(context.getImage())
    imageView.imageSize = imageSize


    var title = ``
    var titleColor = descriptionTextColor
    if (expedition["status"] == "Finished") {
        title = `已完成`
        titleColor = subAlertColor
    } else {
        var remainTime = formatExpRemainTime(parseInt(expedition["remained_time"]))
        title = `${formatExpRemainTime(parseInt(expedition["remained_time"]))[0]}:${formatExpRemainTime(parseInt(expedition["remained_time"]))[1]}`
        titleColor = titleTextColor
    }

    var titleView = view.addStack()
    titleView.layoutHorizontally()
    titleView.centerAlignContent()
    titleView.size = new Size(size.width,size.height - size.width)

    var titleLabel = titleView.addText(`${title}`)
    titleLabel.font = getFont('regular', size.height - size.width - 6)
    titleLabel.textColor = titleColor
    titleLabel.centerAlignText()
    titleLabel.lineLimit = 1
    titleLabel.minimumScaleFactor = 0.1

    return view
}
async function createKeyValueMediumView(widget, size, title, titleColor, description, descriptionColor, value, valueColor, imageUrl) {
    var view = widget.addStack()
    view.layoutHorizontally()
    view.centerAlignContent()
    view.size = size
    view.borderColor = lineColor
    view.borderWidth = 2
    view.backgroundColor = subBackgroundColor
    view.cornerRadius = size.height / 2

    // var left = view.addStack()
    // left.layoutHorizontally()
    // left.centerAlignContent()
    // left.backgroundColor = backgroundColor
    // left.size = new Size(40, view.size.height)

    // var titleText = left.addText(title)
    // titleText.textColor = titleColor
    // titleText.font = getFont("bold", 14)
    // titleText.centerAlignText()
    // titleText.minimumScaleFactor = 0.1
    // titleText.lineLimit = 1
    
    var imageBackgroundSize = Math.min(24, size.height - 4)
    var imageSize = imageBackgroundSize > 24 ? imageBackgroundSize - 4 : imageBackgroundSize

    view.addSpacer(8)

    var left = view.addStack()
    left.layoutHorizontally()
    left.centerAlignContent()
    left.size = new Size(imageBackgroundSize, imageBackgroundSize)
    left.backgroundColor = backgroundColor
    left.cornerRadius = left.size.height / 2
    
    var req = new Request(imageUrl)
    req.method = 'GET'
    let image = left.addImage(await req.loadImage())
    image.imageSize = new Size(imageSize, imageSize)

    var right = view.addStack()
    right.centerAlignContent()
    right.backgroundColor = subBackgroundColor
    right.size = new Size(view.size.width - left.size.width, view.size.height)
    right.setPadding(0, 4, 0, 12)

    let descriptionText = right.addText(description)
    descriptionText.textColor = descriptionColor
    descriptionText.font = getFont("light", 12)
    descriptionText.minimumScaleFactor = 0.1
    descriptionText.lineLimit = 1

    right.addSpacer()

    let valueText = right.addText(value)
    valueText.font = getFont("bold", 14)
    valueText.textColor = valueColor
    valueText.minimumScaleFactor = 0.1
    valueText.lineLimit = 1

    return view
}
async function createKeyValueLargeView(widget, size, title, titleColor, description, descriptionColor, value, valueColor, imageUrl) {
    var view = widget.addStack()
    view.layoutHorizontally()
    view.size = size
    view.backgroundColor = backgroundColor

    view.borderWidth = 2
    view.borderColor = lineColor
    view.cornerRadius = size.height / 2

    var left = view.addStack()
    left.layoutHorizontally()
    left.centerAlignContent()
    left.size = new Size(70 + 24 + 4 + 8, view.size.height)
    left.setPadding(0, 8, 0, 0)

    var req = new Request(imageUrl)
    req.method = 'GET'
    let image = left.addImage(await req.loadImage())
    image.imageSize = new Size(24, 24)

    left.addSpacer(4)

    let titleText = left.addText(title)
    titleText.textColor = titleColor
    titleText.font = getFont("bold", 14)
    titleText.minimumScaleFactor = 0.1
    titleText.lineLimit = 1

    left.addSpacer()

    var right = view.addStack()
    right.backgroundColor = subBackgroundColor
    right.centerAlignContent()
    right.layoutHorizontally()
    right.size = new Size(view.size.width - left.size.width, view.size.height)
    right.setPadding(0, 8, 0, 12)

    let descriptionText = right.addText(description)
    descriptionText.textColor = descriptionColor
    descriptionText.font = getFont("light", 14)
    descriptionText.minimumScaleFactor = 0.1
    descriptionText.lineLimit = 1

    right.addSpacer()

    let valueText = right.addText(value)
    valueText.font = getFont("bold", 14)
    valueText.textColor = valueColor
    valueText.minimumScaleFactor = 0.1
    valueText.lineLimit = 1

    return view
}

async function createSmallWidget() {
    let genshinData = await getGeshinData()
    let widegtWidth = contentWidthWith("small")

    const listWidget = new ListWidget()
    listWidget.backgroundColor = widgetBackgroundColor

    let widget = listWidget.addStack()
    widget.layoutVertically()
    widget.size = new Size(contentWidthWith("small"), contentHeightWith("small"))

    let headerSize = new Size(contentWidthWith("small"), Math.min(16, widget.size.height / 10))
    let header = await createSmallHeader(widget, headerSize)

    let margin = 0
    let row = 3
    var line = Math.ceil(genshinData["expeditions"].length / row)
    line = Math.max(line, 2) 
    widget.addSpacer(margin)

    var expeditionsView = widget.addStack()
    expeditionsView.layoutVertically()

    let expeditionWidth = (widegtWidth + margin) / row - margin
    let expeditionHeight = (widget.size.height - headerSize.height) / 2 - margin
    var expeditionSize = new Size(expeditionWidth, expeditionHeight)
    for (var i = 0; i < line; i++) {

        var expeditionsSubView = widget.addStack()
        expeditionsSubView.size = new Size(widegtWidth, expeditionSize.height)
        expeditionsSubView.layoutHorizontally()

        for (var j = 0; j < row; j++) {
            let current = i * row + j;
            if (j != 0) {
                expeditionsSubView.addSpacer(margin)
            }
            if (genshinData["expeditions"].length > current) {
                var expedition = genshinData["expeditions"][current]

                let expeditionsDetailView = await createExpeditionView(expeditionsSubView, expeditionSize, expedition)

            } else {
                var view = expeditionsSubView.addStack()
                view.size = expeditionSize
            }
        }
        widget.addSpacer(margin)
    }

    return listWidget
}
async function createMediumWidget() {
    let genshinData = await getGeshinData()

    const listWidget = new ListWidget()
    listWidget.backgroundColor = widgetBackgroundColor

    let widget = listWidget.addStack()
    widget.layoutVertically()
    widget.size = new Size(contentWidthWith("medium"), contentHeightWith("medium"))

    let headerSize = new Size(contentWidthWith("large"), 24)
    let header = await createHeader(widget, headerSize)
    widget.addSpacer(10)

    var content = widget.addStack()
    content.layoutVertically()
    content.size = new Size(widget.size.width, (widget.size.height - headerSize.height - 10))

    var margin = 4
    var size = new Size(content.size.width / 2 - 2, content.size.height / 3 - margin)

    var lineFirst = content.addStack()
    lineFirst.size = new Size(content.size.width, size.height)
    lineFirst.layoutHorizontally()

    await createKeyValueMediumView(lineFirst, size,
        `树脂`,
        titleTextColor,
        resinTime(genshinData),
        resinAlert(genshinData) ? alertColor : descriptionTextColor,
        resinNumber(genshinData),
        resinAlert(genshinData) ? subAlertColor : descriptionTextColor,
        resinImageUrl
    )
    
    lineFirst.addSpacer(4)

    await createKeyValueMediumView(lineFirst, size,
        `宝钱`,
        titleTextColor,
        coinTime(genshinData),
        coinAlert(genshinData) ? alertColor : descriptionTextColor,
        coinNumber(genshinData),
        coinAlert(genshinData) ? subAlertColor : descriptionTextColor,
        coinImageUrl
    )
    
    content.addSpacer(4)

    var lineSecond = content.addStack()
    lineSecond.size = lineFirst.size
    lineSecond.layoutHorizontally()

    await createKeyValueMediumView(lineSecond, size,
        `质变`,
        titleTextColor,
        transformerStatus(genshinData),
        transformerAlert(genshinData) ? subAlertColor : descriptionTextColor,
        transformerTime(genshinData),
        transformerAlert(genshinData) ? alertColor : descriptionTextColor,
        transformerImageUrl
    )

    lineSecond.addSpacer(4)

    await createKeyValueMediumView(lineSecond, size,
        `周本`,
        titleTextColor,
        bossStatus(genshinData),
        bossAlert(genshinData) ? alertColor : descriptionTextColor,
        bossNumber(genshinData),
        bossAlert(genshinData) ? subAlertColor : descriptionTextColor,
        bossImageUrl
    )

    content.addSpacer(4)

    var lineThird = content.addStack()
    lineThird.size = lineFirst.size
    lineThird.layoutHorizontally()

    await createKeyValueMediumView(lineThird, size,
        `派遣`,
        titleTextColor,
        expeditionTime(genshinData),
        expeditionTimeAlert(genshinData) ? alertColor : descriptionTextColor,
        expeditionStatus(genshinData),
        expeditionStatusAlert(genshinData) ? subAlertColor : descriptionTextColor,
        expenditionImageUrl
    )

    lineThird.addSpacer(4)

    await createKeyValueMediumView(lineThird, size,
        `每日`,
        titleTextColor,
        taskStatus(genshinData),
        taskAlert(genshinData) ? alertColor : descriptionTextColor,
        taskNumber(genshinData),
        taskAlert(genshinData) ? subAlertColor : descriptionTextColor,
        taskImageUrl
    )

    return listWidget
}
async function createLargeWidget() {
    let genshinData = await getGeshinData()

    const listWidget = new ListWidget()
    listWidget.backgroundColor = widgetBackgroundColor

    let widget = listWidget.addStack()
    widget.layoutVertically()
    widget.size = new Size(contentWidthWith("large"), contentHeightWith("large"))

    let headerSize = new Size(contentWidthWith("large"), 24)
    let header = await createHeader(widget, headerSize)
    widget.addSpacer(10)

    var expeditionSize = new Size(contentWidthWith("large") / 6 - 4, (contentWidthWith("large") / 6 - 4) + 16)
    var size = new Size(contentWidthWith("large"), (widget.size.height - headerSize.height - 10 - expeditionSize.height) / 6 - 4)

    await createKeyValueLargeView(widget, size,
        `原粹树脂`,
        titleTextColor,
        resinTime(genshinData),
        resinAlert(genshinData) ? subAlertColor : descriptionTextColor,
        resinNumber(genshinData),
        resinAlert(genshinData) ? subAlertColor : descriptionTextColor,
        resinImageUrl
    )

    widget.addSpacer(4)

    await createKeyValueLargeView(widget, size,
        `洞天宝钱`,
        titleTextColor,
        coinTime(genshinData),
        coinAlert(genshinData) ? subAlertColor : descriptionTextColor,
        coinNumber(genshinData),
        coinAlert(genshinData) ? subAlertColor : descriptionTextColor,
        coinImageUrl
    )

    widget.addSpacer(4)

    await createKeyValueLargeView(widget, size,
        `参量质变`,
        titleTextColor,
        transformerStatus(genshinData),
        transformerAlert(genshinData) ? subAlertColor : descriptionTextColor,
        transformerTime(genshinData),
        transformerAlert(genshinData) ? subAlertColor : descriptionTextColor,
        transformerImageUrl
    )

    widget.addSpacer(4)

    await createKeyValueLargeView(widget, size,
        `周本减半`,
        titleTextColor,
        bossStatus(genshinData),
        bossAlert(genshinData) ? subAlertColor : descriptionTextColor,
        bossNumber(genshinData),
        bossAlert(genshinData) ? subAlertColor : descriptionTextColor,
        bossImageUrl
    )

    widget.addSpacer(4)

    await createKeyValueLargeView(widget, size,
        `每日委托`,
        titleTextColor,
        taskStatus(genshinData),
        taskAlert(genshinData) ? subAlertColor : descriptionTextColor,
        taskNumber(genshinData),
        taskAlert(genshinData) ? subAlertColor : descriptionTextColor,
        taskImageUrl
    )

    widget.addSpacer(4)

    await createKeyValueLargeView(widget, size,
        `探索派遣`,
        titleTextColor,
        expeditionTime(genshinData),
        expeditionTimeAlert(genshinData) ? subAlertColor : descriptionTextColor,
        expeditionStatus(genshinData),
        expeditionStatusAlert(genshinData) ? subAlertColor : descriptionTextColor,
        expenditionImageUrl
    )

    widget.addSpacer(4)

    var expeditionsView = widget.addStack()
    expeditionsView.size = new Size(contentWidthWith("large"), expeditionSize.height)
    expeditionsView.layoutHorizontally()

    for (var i = 0; i < genshinData["expeditions"].length; i++) {
        var expedition = genshinData["expeditions"][i]
        await createExpeditionView(expeditionsView, expeditionSize, expedition)
        expeditionsView.addSpacer(4)
    }
    expeditionsView.addSpacer()

    return listWidget
}
async function createExtraLargeWidget() {
    let genshinData = await getGeshinData()

    const listWidget = new ListWidget()
    listWidget.backgroundColor = widgetBackgroundColor

    let widget = listWidget.addStack()
    widget.layoutVertically()
    widget.size = new Size(contentWidthWith("extraLarge"), contentHeightWith("extraLarge"))

    let headerSize = new Size(contentWidthWith("extraLarge"), 24)
    var expeditionSize = new Size(contentWidthWith("extraLarge") / 6 - 4, (contentWidthWith("extraLarge") / 6 - 4) + 16)
    let header = await createHeader(widget, headerSize)
    widget.addSpacer(10)

    var line = widget.addStack()
    line.layoutHorizontally()

    var size = new Size(contentWidthWith("extraLarge") / 2 - 6, 38)

    await createKeyValueLargeView(line, size,
        `原粹树脂`,
        titleTextColor,
        resinTime(genshinData),
        resinAlert(genshinData) ? subAlertColor : descriptionTextColor,
        resinNumber(genshinData),
        resinAlert(genshinData) ? subAlertColor : descriptionTextColor,
        resinImageUrl
    )

    line.addSpacer()

    await createKeyValueLargeView(line, size,
        `洞天宝钱`,
        titleTextColor,
        coinTime(genshinData),
        coinAlert(genshinData) ? subAlertColor : descriptionTextColor,
        coinNumber(genshinData),
        coinAlert(genshinData) ? subAlertColor : descriptionTextColor,
        coinImageUrl
    )

    widget.addSpacer(4)

    line = widget.addStack()
    line.layoutHorizontally()

    await createKeyValueLargeView(line, size,
        `参量质变`,
        titleTextColor,
        transformerStatus(genshinData),
        transformerAlert(genshinData) ? subAlertColor : descriptionTextColor,
        transformerTime(genshinData),
        transformerAlert(genshinData) ? subAlertColor : descriptionTextColor,
        transformerImageUrl
    )

    line.addSpacer()

    await createKeyValueLargeView(line, size,
        `周本减半`,
        titleTextColor,
        bossStatus(genshinData),
        bossAlert(genshinData) ? subAlertColor : descriptionTextColor,
        bossNumber(genshinData),
        bossAlert(genshinData) ? subAlertColor : descriptionTextColor,
        bossImageUrl
    )

    widget.addSpacer(4)

    line = widget.addStack()
    line.layoutHorizontally()

    await createKeyValueLargeView(line, size,
        `每日委托`,
        titleTextColor,
        taskStatus(genshinData),
        taskAlert(genshinData) ? subAlertColor : descriptionTextColor,
        taskNumber(genshinData),
        taskAlert(genshinData) ? subAlertColor : descriptionTextColor,
        taskImageUrl
    )

    line.addSpacer()

    await createKeyValueLargeView(line, size,
        `探索派遣`,
        titleTextColor,
        expeditionTime(genshinData),
        expeditionTimeAlert(genshinData) ? subAlertColor : descriptionTextColor,
        expeditionStatus(genshinData),
        expeditionStatusAlert(genshinData) ? subAlertColor : descriptionTextColor,
        expenditionImageUrl
    )

    widget.addSpacer(4)

    var expeditionsView = widget.addStack()
    expeditionsView.layoutHorizontally()

    var expeditionSize = new Size(size.width / 6 - 4, (size.width / 6 - 4) + 16)
    for (var i = 0; i < genshinData["expeditions"].length; i++) {
        var expedition = genshinData["expeditions"][i]
        await createExpeditionView(expeditionsView, expeditionSize, expedition)
        expeditionsView.addSpacer(4)
    }

    return listWidget
}

function widgetWidthWith(widgetFamily) {
    if (Device.isPhone()) {
        var appIconWidth = 64
        if (Device.screenSize().width <= 414) {
            appIconWidth = 60
        }

        var appIconMargin = (Device.screenSize().width - appIconWidth * 4) / 5
        if (widgetFamily == "small") {
            return appIconMargin * 1 + appIconWidth * 2
        } else {
            return appIconMargin * 3 + appIconWidth * 4
        }
    } else {

        var appIconMargin = 20
        if (widgetFamily == "extraLarge") {
            let minWidth = Math.min(Device.screenSize().width, Device.screenSize().height)
            return minWidth * 0.8
        } else if (widgetFamily == "medium" ||
            widgetFamily == "large") {
            return (widgetWidthWith("extraLarge") - appIconMargin) / 2
        } else if (widgetFamily == "small") {
            return (widgetWidthWith("medium") - appIconMargin) / 2
        }
    }
    return 0
}
function widgetHeightWith(widgetFamily) {
    if (widgetFamily == "small" ||
        widgetFamily == "large"
    ) {
        return widgetWidthWith(widgetFamily)
    } else {
        if (Device.isPhone()) {
            var appIconWidth = 64
            if (Device.screenSize().width <= 414) {
                appIconWidth = 60
            }

            var appIconMargin = (Device.screenSize().width - appIconWidth * 4) / 5
            return (widgetWidthWith(widgetFamily) - appIconMargin) / 2
        } else {
            var appIconMargin = 20
            return (widgetWidthWith(widgetFamily) - appIconMargin) / 2
        }
    }
}
function contentWidthWith(widgetFamily) {
    return widgetWidthWith(widgetFamily) - 8 * 2
}
function contentHeightWith(widgetFamily) {
    return widgetHeightWith(widgetFamily) - 8 * 2
}

async function makeGenshinRequest(url) {
    function md5(str) {
        function d(n, t) {
            var r = (65535 & n) + (65535 & t)
            return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r)
        }

        function f(n, t, r, e, o, u) {
            return d(((c = d(d(t, n), d(e, u))) << (f = o)) | (c >>> (32 - f)), r)
            var c, f
        }

        function l(n, t, r, e, o, u, c) {
            return f((t & r) | (~t & e), n, t, o, u, c)
        }

        function v(n, t, r, e, o, u, c) {
            return f((t & e) | (r & ~e), n, t, o, u, c)
        }

        function g(n, t, r, e, o, u, c) {
            return f(t ^ r ^ e, n, t, o, u, c)
        }

        function m(n, t, r, e, o, u, c) {
            return f(r ^ (t | ~e), n, t, o, u, c)
        }

        function i(n, t) {
            var r, e, o, u
                ; (n[t >> 5] |= 128 << t % 32), (n[14 + (((t + 64) >>> 9) << 4)] = t)
            for (
                var c = 1732584193,
                f = -271733879,
                i = -1732584194,
                a = 271733878,
                h = 0;
                h < n.length;
                h += 16
            )
                (c = l((r = c), (e = f), (o = i), (u = a), n[h], 7, -680876936)),
                    (a = l(a, c, f, i, n[h + 1], 12, -389564586)),
                    (i = l(i, a, c, f, n[h + 2], 17, 606105819)),
                    (f = l(f, i, a, c, n[h + 3], 22, -1044525330)),
                    (c = l(c, f, i, a, n[h + 4], 7, -176418897)),
                    (a = l(a, c, f, i, n[h + 5], 12, 1200080426)),
                    (i = l(i, a, c, f, n[h + 6], 17, -1473231341)),
                    (f = l(f, i, a, c, n[h + 7], 22, -45705983)),
                    (c = l(c, f, i, a, n[h + 8], 7, 1770035416)),
                    (a = l(a, c, f, i, n[h + 9], 12, -1958414417)),
                    (i = l(i, a, c, f, n[h + 10], 17, -42063)),
                    (f = l(f, i, a, c, n[h + 11], 22, -1990404162)),
                    (c = l(c, f, i, a, n[h + 12], 7, 1804603682)),
                    (a = l(a, c, f, i, n[h + 13], 12, -40341101)),
                    (i = l(i, a, c, f, n[h + 14], 17, -1502002290)),
                    (c = v(
                        c,
                        (f = l(f, i, a, c, n[h + 15], 22, 1236535329)),
                        i,
                        a,
                        n[h + 1],
                        5,
                        -165796510
                    )),
                    (a = v(a, c, f, i, n[h + 6], 9, -1069501632)),
                    (i = v(i, a, c, f, n[h + 11], 14, 643717713)),
                    (f = v(f, i, a, c, n[h], 20, -373897302)),
                    (c = v(c, f, i, a, n[h + 5], 5, -701558691)),
                    (a = v(a, c, f, i, n[h + 10], 9, 38016083)),
                    (i = v(i, a, c, f, n[h + 15], 14, -660478335)),
                    (f = v(f, i, a, c, n[h + 4], 20, -405537848)),
                    (c = v(c, f, i, a, n[h + 9], 5, 568446438)),
                    (a = v(a, c, f, i, n[h + 14], 9, -1019803690)),
                    (i = v(i, a, c, f, n[h + 3], 14, -187363961)),
                    (f = v(f, i, a, c, n[h + 8], 20, 1163531501)),
                    (c = v(c, f, i, a, n[h + 13], 5, -1444681467)),
                    (a = v(a, c, f, i, n[h + 2], 9, -51403784)),
                    (i = v(i, a, c, f, n[h + 7], 14, 1735328473)),
                    (c = g(
                        c,
                        (f = v(f, i, a, c, n[h + 12], 20, -1926607734)),
                        i,
                        a,
                        n[h + 5],
                        4,
                        -378558
                    )),
                    (a = g(a, c, f, i, n[h + 8], 11, -2022574463)),
                    (i = g(i, a, c, f, n[h + 11], 16, 1839030562)),
                    (f = g(f, i, a, c, n[h + 14], 23, -35309556)),
                    (c = g(c, f, i, a, n[h + 1], 4, -1530992060)),
                    (a = g(a, c, f, i, n[h + 4], 11, 1272893353)),
                    (i = g(i, a, c, f, n[h + 7], 16, -155497632)),
                    (f = g(f, i, a, c, n[h + 10], 23, -1094730640)),
                    (c = g(c, f, i, a, n[h + 13], 4, 681279174)),
                    (a = g(a, c, f, i, n[h], 11, -358537222)),
                    (i = g(i, a, c, f, n[h + 3], 16, -722521979)),
                    (f = g(f, i, a, c, n[h + 6], 23, 76029189)),
                    (c = g(c, f, i, a, n[h + 9], 4, -640364487)),
                    (a = g(a, c, f, i, n[h + 12], 11, -421815835)),
                    (i = g(i, a, c, f, n[h + 15], 16, 530742520)),
                    (c = m(
                        c,
                        (f = g(f, i, a, c, n[h + 2], 23, -995338651)),
                        i,
                        a,
                        n[h],
                        6,
                        -198630844
                    )),
                    (a = m(a, c, f, i, n[h + 7], 10, 1126891415)),
                    (i = m(i, a, c, f, n[h + 14], 15, -1416354905)),
                    (f = m(f, i, a, c, n[h + 5], 21, -57434055)),
                    (c = m(c, f, i, a, n[h + 12], 6, 1700485571)),
                    (a = m(a, c, f, i, n[h + 3], 10, -1894986606)),
                    (i = m(i, a, c, f, n[h + 10], 15, -1051523)),
                    (f = m(f, i, a, c, n[h + 1], 21, -2054922799)),
                    (c = m(c, f, i, a, n[h + 8], 6, 1873313359)),
                    (a = m(a, c, f, i, n[h + 15], 10, -30611744)),
                    (i = m(i, a, c, f, n[h + 6], 15, -1560198380)),
                    (f = m(f, i, a, c, n[h + 13], 21, 1309151649)),
                    (c = m(c, f, i, a, n[h + 4], 6, -145523070)),
                    (a = m(a, c, f, i, n[h + 11], 10, -1120210379)),
                    (i = m(i, a, c, f, n[h + 2], 15, 718787259)),
                    (f = m(f, i, a, c, n[h + 9], 21, -343485551)),
                    (c = d(c, r)),
                    (f = d(f, e)),
                    (i = d(i, o)),
                    (a = d(a, u))
            return [c, f, i, a]
        }

        function a(n) {
            for (var t = '', r = 32 * n.length, e = 0; e < r; e += 8)
                t += String.fromCharCode((n[e >> 5] >>> e % 32) & 255)
            return t
        }

        function h(n) {
            var t = []
            for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1)
                t[e] = 0
            for (var r = 8 * n.length, e = 0; e < r; e += 8)
                t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32
            return t
        }

        function e(n) {
            for (var t, r = '0123456789abcdef', e = '', o = 0; o < n.length; o += 1)
                (t = n.charCodeAt(o)),
                    (e += r.charAt((t >>> 4) & 15) + r.charAt(15 & t))
            return e
        }

        function r(n) {
            return unescape(encodeURIComponent(n))
        }

        function o(n) {
            return a(i(h((t = r(n))), 8 * t.length))
            var t
        }

        function u(n, t) {
            return (function (n, t) {
                var r,
                    e,
                    o = h(n),
                    u = [],
                    c = []
                for (
                    u[15] = c[15] = void 0,
                    16 < o.length && (o = i(o, 8 * n.length)),
                    r = 0;
                    r < 16;
                    r += 1
                )
                    (u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r])
                return (
                    (e = i(u.concat(h(t)), 512 + 8 * t.length)), a(i(c.concat(e), 640))
                )
            })(r(n), r(t))
        }

        function t(n, t, r) {
            return t ? (r ? u(t, n) : e(u(t, n))) : r ? o(n) : e(o(n))
        }

        return t(str)
    }
    var time_ = String(parseInt(Date.now() / 1000))
    var random_ = String(parseInt((Math.random() + 1) * 100000))
    var check = md5("salt=xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs&t=" + time_ + "&r=" + random_ + "&b=&q=" + url.split("?")[1])

    var ds = time_ + "," + random_ + "," + check

    const req = new Request(url)
    req.method = "GET"
    req.headers = {
        "Cookie": mihoyoCookie,
        "DS": ds,
        "x-rpc-app_version": "2.20.1",
        "x-rpc-client_type": "5"
    };

    await req.load()
    return req.loadJSON()
}
async function getGeshinData() {
    // 获取角色信息
    var genshinRsp = await makeGenshinRequest("https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_cn")
    console.log(genshinRsp)
    const userRole = genshinRsp["data"]["list"][0]

    // 获取原神便笺
    var genshinRsp = await makeGenshinRequest("https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/dailyNote?role_id=" + userRole["game_uid"] + "&server=" + userRole["region"])
    console.log(genshinRsp)

    return genshinRsp["data"]
}

function resinNumber(genshinData) {
    return `${genshinData["current_resin"]} / 160`
}
function resinTime(genshinData) {
    var nearFull = genshinData["current_resin"] >= genshinData["max_resin"] * 0.9
    return !nearFull ? `${formatExpRemainTime(parseInt(genshinData["resin_recovery_time"]))[0]}:${formatExpRemainTime(parseInt(genshinData["resin_recovery_time"]))[1]}` : `MAX`
}
function resinAlert(genshinData) {
    var nearFull = genshinData["current_resin"] >= genshinData["max_resin"] * 0.9
    return nearFull
}

function expeditionFinishedNumber(genshinData) {
    var finishedNumber = 0
    var maxTime = 0
    var minTime = 0
    for (var i = 0; i < genshinData["expeditions"].length; i++) {
        var expedition = genshinData["expeditions"][i]
        if (expedition["status"] == "Finished") {
            finishedNumber += 1
        } else {
            maxTime = Math.max(maxTime, parseInt(expedition["remained_time"]))
            minTime = Math.min(minTime, parseInt(expedition["remained_time"]))
        }
    }
    return finishedNumber
}
function expeditionMaxTime(genshinData) {
    var finishedNumber = 0
    var maxTime = 0
    var minTime = 0
    for (var i = 0; i < genshinData["expeditions"].length; i++) {
        var expedition = genshinData["expeditions"][i]
        if (expedition["status"] == "Finished") {
            finishedNumber += 1
        } else {
            maxTime = Math.max(maxTime, parseInt(expedition["remained_time"]))
            minTime = Math.min(minTime, parseInt(expedition["remained_time"]))
        }
    }
    return maxTime
}
function expeditionMinTime(genshinData) {
    var finishedNumber = 0
    var maxTime = 0
    var minTime = 0
    for (var i = 0; i < genshinData["expeditions"].length; i++) {
        var expedition = genshinData["expeditions"][i]
        if (i == 0) {
            minTime = parseInt(expedition["remained_time"])
        }
        if (expedition["status"] == "Finished") {
            finishedNumber += 1
        } else {
            maxTime = Math.max(maxTime, parseInt(expedition["remained_time"]))
            minTime = Math.min(minTime, parseInt(expedition["remained_time"]))
        }
    }
    return minTime
}
function expeditionStatus(genshinData) {
    return `${expeditionFinishedNumber(genshinData)} / ${genshinData["current_expedition_num"]} / ${genshinData["max_expedition_num"]}`
}
function expeditionStatusAlert(genshinData) {
    if (expeditionFinishedNumber(genshinData) != 0) {
        return true
    } else if (genshinData["current_expedition_num"] != genshinData["max_expedition_num"]) {
        return true
    } else {
        return false
    }
}
function expeditionTime(genshinData) {
    var minSecond = expeditionMinTime(genshinData)
    var maxSecond = expeditionMaxTime(genshinData)
    var minTime = formatExpRemainTime(minSecond)
    var maxTime = formatExpRemainTime(maxSecond)

    if (maxSecond == 0) {
        return `全部完成`
    } else if (minSecond == 0) {
        return `${maxTime[0]}:${maxTime[1]}`
    } else {
        return `${minTime[0]}:${minTime[1]}`
    }
}
function expeditionTimeAlert(genshinData) {
    return expeditionMaxTime(genshinData) < 60 * 10
}

function coinNumber(genshinData) {
    return `${genshinData["current_home_coin"]} / ${genshinData["max_home_coin"]}`
}
function coinAlert(genshinData) {
    return genshinData["current_home_coin"] >= genshinData["max_home_coin"] * 0.9
}
function coinTime(genshinData) {
    var remainTime = formatExpRemainTime(parseInt(genshinData["home_coin_recovery_time"]))
    return genshinData["current_home_coin"] != genshinData["max_home_coin"] ? `${remainTime[0]}:${remainTime[1]}` : `MAX`
}

function taskNumber(genshinData) {
    return `${genshinData["finished_task_num"]} / ${genshinData["total_task_num"]}`
}
function taskAlert(genshinData) {
    return genshinData["finished_task_num"] != genshinData["total_task_num"]
}
function taskStatus(genshinData) {
    return genshinData["finished_task_num"] != genshinData["total_task_num"] ? `未完成` : `已完成`
}

function transformerTime(genshinData) {
    if (genshinData["transformer"]["recovery_time"]["Day"] > 0) {
        return `${genshinData["transformer"]["recovery_time"]["Day"]}天`
    } else if (genshinData["transformer"]["recovery_time"]["Hour"] > 0) {
        return `${genshinData["transformer"]["recovery_time"]["Hour"]}小时`
    } else if (genshinData["transformer"]["recovery_time"]["Minute"] > 0) {
        return `${genshinData["transformer"]["recovery_time"]["Minute"]}分`
    } else {
        return `${genshinData["transformer"]["recovery_time"]["Second"]}秒`
    }
}
function transformerStatus(genshinData) {
    if (genshinData["transformer"]["recovery_time"]["Day"] > 0) {
        return `冷却中`
    } else if (genshinData["transformer"]["recovery_time"]["reached"]) {
        return `冷却完毕`
    } else {
        return `即将完毕`
    }
}
function transformerAlert(genshinData) {
    if (genshinData["transformer"]["recovery_time"]["Day"] > 0) {
        return false
    } else {
        return true
    }
}

function bossNumber(genshinData) {
    return `${genshinData["remain_resin_discount_num"]} / ${genshinData["resin_discount_num_limit"]}`
}
function bossStatus(genshinData) {
    return genshinData["remain_resin_discount_num"] != 0 ? `待讨伐` : `已讨伐`
}
function bossAlert(genshinData) {
    return genshinData["remain_resin_discount_num"] != 0
}

function formatExpRemainTime(timeRemain) {
    let processTimeTmp = parseInt(timeRemain / 60)

    let hour = parseInt(processTimeTmp / 60)
    let minute = parseInt(processTimeTmp % 60)
    let second = parseInt(timeRemain % 60)

    return [hour.toString().padStart(2, '0'), minute.toString().padStart(2, '0'), second.toString().padStart(2, '0')]
}
function getFont(fontName, fontSize) {
    const fontGenerator = {
        light: function () {
            return Font.lightMonospacedSystemFont(fontSize)
        },
        medium: function () {
            return Font.mediumMonospacedSystemFont(fontSize)
        },
        regular: function () {
            return Font.regularMonospacedSystemFont(fontSize)
        },
        bold: function () {
            return Font.boldMonospacedSystemFont(fontSize)
        },
        heavy: function () {
            return Font.heavyMonospacedSystemFont(fontSize)
        },
        black: function () {
            return Font.blackMonospacedSystemFont(fontSize)
        }
    }

    const systemFont = fontGenerator[fontName]
    if (systemFont) {
        return systemFont()
    }
    return new Font(fontName, fontSize)
}
