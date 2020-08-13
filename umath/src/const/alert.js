  
const nextSkill =
"You will now be asked to complete the next task for mastering this skill. If your previous problem was left incomplete, it means you have exceeded the maximum number of mistakes allowed for that problem. Don’t worry, you’ll be asked to complete it at some later point.";

const completeSkill = "The skill mastery has been completed. Congratulations.";

const videoRedirectWarning =
  "You will now be asked to complete the next task for mastering this skill. If you haven’t finished watching the video, please do so before moving to the next task";

const stepRedirectCorrect = "You have successfully solved the problem. You’ll now be given more tasks to achieve skill mastery."

const stepRedirectIncorrect = (step) => `Unfortunately, you answered Step ${step} incorrectly. Don’t worry! You’ll now be given other tasks to master your skill and we’ll be back to this problem at a later stage.`

export { nextSkill, completeSkill, videoRedirectWarning, stepRedirectCorrect, stepRedirectIncorrect };
