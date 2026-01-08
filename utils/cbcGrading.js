/**
 * CBC GLOBAL GRADING LOGIC (KENYA)
 * Locked – DO NOT MODIFY
 */

const CBC_GRADING_MAP = [
  { min: 90, max: 100, code: "EE1", label: "Exceeding Expectation", points: 8 },
  { min: 75, max: 89,  code: "EE2", label: "Exceeding Expectation", points: 7 },
  { min: 58, max: 74,  code: "ME1", label: "Meeting Expectation",   points: 6 },
  { min: 41, max: 57,  code: "ME2", label: "Meeting Expectation",   points: 5 },
  { min: 31, max: 40,  code: "AE1", label: "Approaching Expectation", points: 4 },
  { min: 21, max: 30,  code: "AE2", label: "Approaching Expectation", points: 3 },
  { min: 11, max: 20,  code: "BE1", label: "Below Expectation",      points: 2 },
  { min: 1,  max: 10,  code: "BE2", label: "Below Expectation",      points: 1 }
];

function mapScoreToCBC(percentage) {
  return CBC_GRADING_MAP.find(
    g => percentage >= g.min && percentage <= g.max
  );
}

function processScore(rawScore, maxScore = 100) {
  const percentage = Math.round((rawScore / maxScore) * 100);
  const cbc = mapScoreToCBC(percentage);

  return {
    cbc_level: cbc.code,
    cbc_label: cbc.label,
    points: cbc.points
  };
}

module.exports = {
  processScore
};
