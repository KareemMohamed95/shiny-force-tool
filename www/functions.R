bodies <- list("Ball" = list("Mass" = "5", "friction" = "0.004"),
               "Fishtank" = list("Mass" = "10", "friction" = "0.007"),
               "Toycar" = list("Mass" = "15", "friction" = "0.009"))

rerender_body_info <- function(body_type) {
  output$body_info_output <- renderUI({
    tagList(
      span(class = "red-span fs-15",
           paste0("Mass = ",bodies[[body_type]][["Mass"]],"kg")),
      tags$br(),
      span(class = "red-span fs-15",
           paste0("Friction coefficient = ",bodies[[body_type]][["friction"]]))
    )
  })
}