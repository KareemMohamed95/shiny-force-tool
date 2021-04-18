
observeEvent(input$mass_input, {
  if(is.null(input$mass_input) || is.na(input$mass_input) || input$mass_input <= 0 || input $mass_input > 30)return()
  mass_input = input$mass_input
  runjs(paste0("changeBodyMass(",mass_input,")"))
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
  runjs("changeBaseBackground()")
})
