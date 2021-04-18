# change X for type number
questionTypeX <- function() {
  # weight of this type of question
  weight <- 5
  difficulty <- "easy"
  # quiz_variables all the variables that you will need in the question and will be randomly generated
  quiz_variables <- list(
    x = sample(-5:5, 1),
    y = sample(-5:5, 1)
  )
  # answers list carry list for each input id and the expected value in this input and optional validation function name
  answers <- list(list(id = "numeric1", value = quiz_variables$x + quiz_variables$y, func = ""))
  # return all that values as list of objects similar to json object
  return(list(quiz_variables = quiz_variables, answers = answers, weight = weight, difficulty = difficulty))
}
