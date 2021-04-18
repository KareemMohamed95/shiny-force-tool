div(class = "flex-center wrapflex wd-100 text-out",
    div(id = "scene"),
    div(class = "col-sm-12"),
    div(class = "col-sm-12 flex-center",
        div(style = "display: inline-grid;",
            div(class = "flex-center",
                span("Type of body = "),
                div(class = "mrl-15",
                    style = "width: 200px;",
                    selectInput("body_type_input", "", choices = list("Ball", "Fishtank", "Toycar"), selected = "Ball"))
                ),
            uiOutput("body_info_output")
        ),
        div(style = "width: 60px;"),
        span("Position ="),
        div(class = "mrl-15",
            sliderInput(inputId = "position_input", label = "", min = 0, max = 10, step = 0.1, value = 5))
        ),
    div(class = "col-sm-12 flex-center",
        span("Type of surface = "),
        div(class = "mrl-15",
            style = "width: 200px;",
            selectInput("surface_type_input", "", choices = list("Friction", "Smooth"), selected = "Friction", width = "200px"))
        ),
    div(class = "col-sm-12 flex-center",
        span("Apply Right Horizontal Force of"),
        div(class = "numeric-input-div",
            numericInput("hfright","",1)),
        actionButton("hfright_button", "Apply", class = "orangeBtn mrl-15")
        ),
    div(class = "col-sm-12 flex-center",
        span("Apply Left Horizontal Force of"),
        div(class = "numeric-input-div",
            numericInput("hfleft","",1)),
        actionButton("hfleft_button", "Apply", class = "orangeBtn mrl-15")
    )
)