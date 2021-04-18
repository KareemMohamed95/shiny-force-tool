

shinyServer(function(input, output, session) {
  translation <- fromJSON(file = "./www/Translations/lang.json")
  language <- reactiveValues(current = "english")
  learn_tab <- reactiveValues(current_step = 1, number_of_steps = 1)
  common_examples_tab <- reactiveValues(current_step = 1, number_of_steps = 3)
  eval(parse(text = includeText("./www/functions.R")))
  Master::ServerInit(
    mjxMenuHTMLCSS = TRUE,
    Development = TRUE,
    env = environment(),
    session = session,
    CommonExamplesVisible = FALSE,
    QuizVisible = FALSE,
    ChallengeVisible = FALSE,
    NextButtonLearn = FALSE,
    PreviousButtonLearn = FALSE
  )
  output$learn_content <- renderUI({
    eval(parse(text = includeText(paste0("./www/Content/learn/step", toString(learn_tab$current_step), ".R"))))
  })
  observe({
    eval(parse(text = includeText(paste0("./www/Content/learn/step", toString(learn_tab$current_step), "-server.R"))))
  })
  output$common_examples_content <- renderUI({
    eval(parse(text = includeText(paste0("./www/Content/common-examples/step", toString(common_examples_tab$current_step), ".R"))))
  })
  observe({
    eval(parse(text = includeText(paste0("./www/Content/common-examples/step", toString(common_examples_tab$current_step), "-server.R"))))
  })

})
