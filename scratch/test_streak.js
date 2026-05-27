function calculateStreak(historyList) {
  if (!historyList || historyList.length === 0) return 0;
  const uniqueDates = [...new Set(historyList)].sort((a, b) => new Date(b) - new Date(a));
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  console.log("uniqueDates:", uniqueDates);
  console.log("todayStr:", todayStr, "yesterdayStr:", yesterdayStr);
  
  if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
    return 0;
  }
  
  let currentStreak = 0;
  let checkDate = new Date(uniqueDates[0]);
  
  for (let i = 0; i < 365; i++) {
    const checkStr = checkDate.toISOString().split('T')[0];
    if (uniqueDates.includes(checkStr)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  return currentStreak;
}

// Test case 1: Active streak including today
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const dayBefore = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
console.log("Test 1 (Active streak of 3):", calculateStreak([today, yesterday, dayBefore]));

// Test case 2: Broken streak (completed dayBefore but not yesterday/today)
console.log("Test 2 (Broken streak):", calculateStreak([dayBefore]));

// Test case 3: Active streak including yesterday (today not yet completed)
console.log("Test 3 (Active streak of 2, today pending):", calculateStreak([yesterday, dayBefore]));
