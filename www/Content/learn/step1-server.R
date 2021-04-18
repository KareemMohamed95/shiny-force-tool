
observeEvent(input$body_type_input, {
  if(is.null(input$body_type_input) || is.na(input$body_type_input))return()
  runjs(paste0("changeBody(\"",input$body_type_input,"\")"))
  rerender_body_info(input$body_type_input)
})

observeEvent(input$hfright_button, {
  if(is.null(input$hfright) || is.na(input$hfright))return()
  hfright <- input$hfright
  runjs(paste0("applyHFR(",hfright,")"))
})

observeEvent(input$hfleft_button, {
  if(is.null(input$hfleft) || is.na(input$hfleft))return()
  hfleft <- input$hfleft*-1
  runjs(paste0("applyHFL(",hfleft,")"))
})

observeEvent(input$position_input, {
  if(is.null(input$position_input) || is.na(input$position_input))return();
  position <- input$position_input * 10
  position_difference <- 600 * position / 100
  new_x <- 100 + position_difference
  runjs(paste0("changeBodyPosition(",new_x,")"))
})

observeEvent(input$surface_type_input, {
  if(is.null(input$surface_type_input) || is.na(input$surface_type_input))return();
  runjs(paste0("changeBaseBackground(\"",input$surface_type_input,"\")"))
})

output$body_info_output <- renderUI({
 tagList(
     span(class = "red-span fs-15",
          "Mass = 5kg"),
     tags$br(),
     span(class = "red-span fs-15",
          "Friction coefficient = 0.004")
   )
})