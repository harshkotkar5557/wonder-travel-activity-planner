import type { ActivityRanking } from "../../types";
import "./index.style.css";

interface ActivityRankingProps {
  rankings: ActivityRanking[];
}

function getScoreClass(score: number) {
  if (score >= 75) return "high";
  if (score >= 40) return "medium";
  return "low";
}

export function ActivityRanking({ rankings }: ActivityRankingProps) {
  return (
    <section>
      <h2>Recommended Activities</h2>

      {rankings.map((activity) => (
        <div key={activity.kind} className="activity-card">
          <div>
            <h3>{activity.label}</h3>
            <span className={`score-badge ${getScoreClass(activity.score)}`}>
              {activity.score}/100
            </span>
          </div>

          <span>{activity.reason}</span>
        </div>
      ))}
    </section>
  );
}
