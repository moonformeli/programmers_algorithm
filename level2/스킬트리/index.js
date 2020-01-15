const reg = skill => new RegExp(`[^${skill.split('').join('|')}]`, 'gi');

const solution = (skill, skillTrees) => {
  return skillTrees.reduce((cnt, curSkill) => {
    const usedSkillTree = curSkill.replace(reg(skill), '').split('');
    const skillsUsage = new Array(skill.length).fill(0);

    // 사용된 스킬 순서 기록
    usedSkillTree.forEach((spell, i) => {
      const index = skill.indexOf(spell);
      skillsUsage[index] = i + 1;
    });

    const firstSkillIndex = skillsUsage.findIndex(Number);
    const lastSkillIndex = skillsUsage.reduce((index, usage, i) => {
      return usage > 0 ? i : index;
    }, -1);

    if (firstSkillIndex > 0) {
      return cnt;
    }

    // 순서대로 사용이 되었는지 확인
    for (let i = firstSkillIndex; i < lastSkillIndex; i += 1) {
      if (skillsUsage[i] === 0 || skillsUsage[i] > skillsUsage[i + 1]) {
        return cnt;
      }
    }

    return cnt + 1;
  }, 0);
};
