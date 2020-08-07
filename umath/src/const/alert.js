const nextSkill = (step) =>
`Unfortunately, you answered ${step} incorrectly. Don’t worry! You’ll now be given other tasks to master your skill and we’ll be back to this problem at a later stage.Unfortunately, you answered Step 3(correctcount+1) incorrectly. Don’t worry! You’ll now be given other tasks to master your skill and we’ll be back to this problem at a later stage.`;

const completeSkill = "Great job! You have successfully solved the problem. You’ll now be given more tasks to achieve skill mastery.";

const videoRedirectWarning =
  "You will now be asked to complete the next task for mastering this skill. If you haven’t finished watching the video, please do so before moving to the next task";

const stepRedirectWarning = "You will now be asked to complete the next task for mastering this skill. If your previous problem was left incomplete, it means you have exceeded the maximum number of mistakes allowed for that problem. Don’t worry, you’ll be asked to complete it at some later point.";

export { nextSkill, completeSkill, videoRedirectWarning, stepRedirectWarning };
