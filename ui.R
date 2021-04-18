
library(shiny)
library(shinyjs)
library(shinyWidgets)
library(shinycssloaders)
library(rjson)
library(AppInitialization)
library(LocalStorage)
library(Translations)
library(QuizPack)
library(EndSessionHandeller)

shinyUI(fluidPage(
  useShinyjs(),
  useSweetAlert(),
  Master::UIInit(Development = TRUE),
  tags$head(
    tags$link(rel = "stylesheet", type = "text/css", href = "CSS/media-query.css"),
    tags$link(rel = "stylesheet", type = "text/css", href = "CSS/custom-styles.css"),
    tags$script(src = "matter-js-0.17.1/build/matter.js"),
    tags$script(src = "Scripts/step1-scene.js")
  ),
  uiOutput("LessonPage")
))
