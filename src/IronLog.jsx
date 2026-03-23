import { useState, useEffect, useCallback } from "react";

const WORKOUT_PLANS = {
  push: {
    A: {
      label: "Push A",
      supersets: [
        { label: "S1", exercises: [
          { name: "DB Bench Press", bodyPart: "Chest", targetReps: 12, sets: 3, startWeight: 55, isBodyweight: false },
          { name: "Diamond Push-ups", bodyPart: "Triceps", targetReps: 15, sets: 3, startWeight: 0, isBodyweight: true },
        ]},
        { label: "S2", exercises: [
          { name: "DB Shoulder Press", bodyPart: "Shoulders", targetReps: 12, sets: 3, startWeight: 35, isBodyweight: false },
          { name: "DB Lateral Raises", bodyPart: "Side Delts", targetReps: 15, sets: 3, startWeight: 15, isBodyweight: false },
        ]},
        { label: "S3", exercises: [
          { name: "DB Incline Fly", bodyPart: "Upper Chest", targetReps: 12, sets: 3, startWeight: 30, isBodyweight: false },
          { name: "DB Skull Crushers", bodyPart: "Triceps", targetReps: 12, sets: 3, startWeight: 25, isBodyweight: false },
        ]},
      ],
      finisher: { name: "Push-up Burnout", bodyPart: "Chest/Tri", targetReps: "MAX", sets: 2, startWeight: 0, isBodyweight: true },
    },
    B: {
      label: "Push B",
      supersets: [
        { label: "S1", exercises: [
          { name: "DB Floor Press", bodyPart: "Chest", targetReps: 12, sets: 3, startWeight: 50, isBodyweight: false },
          { name: "Close-grip Push-ups", bodyPart: "Triceps", targetReps: 15, sets: 3, startWeight: 0, isBodyweight: true },
        ]},
        { label: "S2", exercises: [
          { name: "Arnold Press", bodyPart: "Shoulders", targetReps: 12, sets: 3, startWeight: 30, isBodyweight: false },
          { name: "DB Pullover", bodyPart: "Chest/Lats", targetReps: 12, sets: 3, startWeight: 30, isBodyweight: false },
        ]},
        { label: "S3", exercises: [
          { name: "DB Overhead Tricep Ext", bodyPart: "Triceps", targetReps: 12, sets: 3, startWeight: 25, isBodyweight: false },
          { name: "Pike Push-ups", bodyPart: "Shoulders", targetReps: 12, sets: 3, startWeight: 0, isBodyweight: true },
        ]},
      ],
      finisher: { name: "Push-up Burnout", bodyPart: "Chest/Tri", targetReps: "MAX", sets: 2, startWeight: 0, isBodyweight: true },
    },
    emoji: "🔥", color: "#FF6B35", muscles: "Chest · Shoulders · Triceps",
  },
  pull: {
    A: {
      label: "Pull A",
      supersets: [
        { label: "S1", exercises: [
          { name: "Pull-ups", bodyPart: "Back/Lats", targetReps: "MAX", sets: 3, startWeight: 0, isBodyweight: true },
          { name: "DB Bent-Over Rows", bodyPart: "Mid Back", targetReps: 12, sets: 3, startWeight: 45, isBodyweight: false },
        ]},
        { label: "S2", exercises: [
          { name: "DB Reverse Fly", bodyPart: "Rear Delts", targetReps: 15, sets: 3, startWeight: 15, isBodyweight: false },
          { name: "DB Bicep Curls", bodyPart: "Biceps", targetReps: 12, sets: 3, startWeight: 35, isBodyweight: false },
        ]},
        { label: "S3", exercises: [
          { name: "DB Hammer Curls", bodyPart: "Forearms/Bi", targetReps: 12, sets: 3, startWeight: 30, isBodyweight: false },
          { name: "Hanging Leg Raises", bodyPart: "Core", targetReps: 15, sets: 3, startWeight: 0, isBodyweight: true },
        ]},
      ],
      finisher: { name: "Dead Hangs", bodyPart: "Grip/Back", targetReps: "30s", sets: 2, startWeight: 0, isBodyweight: true },
    },
    B: {
      label: "Pull B",
      supersets: [
        { label: "S1", exercises: [
          { name: "Chin-ups", bodyPart: "Back/Biceps", targetReps: "MAX", sets: 3, startWeight: 0, isBodyweight: true },
          { name: "Single-arm DB Row", bodyPart: "Mid Back", targetReps: "12/arm", sets: 3, startWeight: 40, isBodyweight: false },
        ]},
        { label: "S2", exercises: [
          { name: "DB Shrugs", bodyPart: "Traps", targetReps: 15, sets: 3, startWeight: 45, isBodyweight: false },
          { name: "DB Concentration Curls", bodyPart: "Biceps", targetReps: "10/arm", sets: 3, startWeight: 25, isBodyweight: false },
        ]},
        { label: "S3", exercises: [
          { name: "DB Zottman Curls", bodyPart: "Bi/Forearms", targetReps: 12, sets: 3, startWeight: 20, isBodyweight: false },
          { name: "Hanging Knee Raises", bodyPart: "Core", targetReps: 15, sets: 3, startWeight: 0, isBodyweight: true },
        ]},
      ],
      finisher: { name: "Dead Hangs", bodyPart: "Grip/Back", targetReps: "30s", sets: 2, startWeight: 0, isBodyweight: true },
    },
    emoji: "💪", color: "#4ECDC4", muscles: "Back · Biceps · Rear Delts",
  },
  legs: {
    A: {
      label: "Legs A",
      supersets: [
        { label: "S1", exercises: [
          { name: "DB Goblet Squats", bodyPart: "Quads/Glutes", targetReps: 15, sets: 3, startWeight: 55, isBodyweight: false },
          { name: "DB Calf Raises", bodyPart: "Calves", targetReps: 20, sets: 3, startWeight: 55, isBodyweight: false },
        ]},
        { label: "S2", exercises: [
          { name: "DB Romanian Deadlifts", bodyPart: "Hamstrings", targetReps: 12, sets: 3, startWeight: 45, isBodyweight: false },
          { name: "DB Step-Ups", bodyPart: "Quads/Glutes", targetReps: "12/leg", sets: 3, startWeight: 30, isBodyweight: false },
        ]},
        { label: "S3", exercises: [
          { name: "DB Bulgarian Split Squats", bodyPart: "Quads/Glutes", targetReps: "10/leg", sets: 3, startWeight: 30, isBodyweight: false },
          { name: "Plank Hold", bodyPart: "Core", targetReps: "45s", sets: 3, startWeight: 0, isBodyweight: true },
        ]},
      ],
      finisher: { name: "Jump Squats", bodyPart: "Quads/Cardio", targetReps: 15, sets: 2, startWeight: 0, isBodyweight: true },
    },
    B: {
      label: "Legs B",
      supersets: [
        { label: "S1", exercises: [
          { name: "DB Sumo Squats", bodyPart: "Quads/Inner", targetReps: 15, sets: 3, startWeight: 50, isBodyweight: false },
          { name: "DB Lunges", bodyPart: "Quads/Glutes", targetReps: "12/leg", sets: 3, startWeight: 30, isBodyweight: false },
        ]},
        { label: "S2", exercises: [
          { name: "DB Single-leg RDL", bodyPart: "Hamstrings", targetReps: "10/leg", sets: 3, startWeight: 30, isBodyweight: false },
          { name: "DB Hip Thrusters", bodyPart: "Glutes", targetReps: 15, sets: 3, startWeight: 45, isBodyweight: false },
        ]},
        { label: "S3", exercises: [
          { name: "Wall Sit", bodyPart: "Quads", targetReps: "45s", sets: 3, startWeight: 0, isBodyweight: true },
          { name: "Mountain Climbers", bodyPart: "Core/Cardio", targetReps: "30s", sets: 3, startWeight: 0, isBodyweight: true },
        ]},
      ],
      finisher: { name: "Jump Squats", bodyPart: "Quads/Cardio", targetReps: 15, sets: 2, startWeight: 0, isBodyweight: true },
    },
    emoji: "🦵", color: "#FFE66D", muscles: "Quads · Hamstrings · Glutes · Core",
  },
};

const STORAGE_KEY = "iron-log-data";
const DEFAULT_DATA = { workouts: [], bodyweight: [{ date: "2026-03-17", weight: 156 }] };

const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { ...DEFAULT_DATA };
  } catch {
    return { ...DEFAULT_DATA };
  }
};

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Save failed:", e);
  }
};

const getSuggestedWeight = (exerciseName, startWeight, workouts) => {
  const past = workouts
    .flatMap((w) => w.exercises)
    .filter((e) => e.name === exerciseName && e.feedback);
  if (past.length === 0) return startWeight;
  const last = past[past.length - 1];
  const lastMaxWeight = Math.max(...last.sets.map((s) => s.weight || 0));
  if (lastMaxWeight === 0) return startWeight;
  return last.feedback <= 3 ? Math.round(lastMaxWeight * 1.05 / 2.5) * 2.5 : lastMaxWeight;
};

const getPlanVariant = (type, workouts) => {
  const count = workouts.filter((w) => w.type === type).length;
  const cycle = Math.floor(count / 4);
  return cycle % 2 === 0 ? "A" : "B";
};

const getVolume = (workout) => {
  return workout.exercises.reduce((total, e) => {
    return total + e.sets.reduce((setTotal, s) => setTotal + (s.weight || 0) * (s.reps || 0), 0);
  }, 0);
};

const formatDate = (d) => {
  const date = new Date(d + "T12:00:00");
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

const formatNum = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const StarRating = ({ value, onChange }) => (
  <div style={{ display: "flex", gap: 4 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <button key={i} onClick={() => onChange(i)}
        style={{
          background: "none", border: "none", cursor: "pointer", fontSize: 20, padding: 2,
          color: i <= value ? "#FFE66D" : "#333",
          filter: i <= value ? "drop-shadow(0 0 4px rgba(255,230,109,0.5))" : "none",
        }}>★</button>
    ))}
  </div>
);

const ExerciseCard = ({ exercise, exerciseIndex, onUpdate, color, suggested }) => {
  const updateSet = (setIdx, field, val) => {
    const updated = { ...exercise, sets: exercise.sets.map((s, i) => (i === setIdx ? { ...s, [field]: val } : s)) };
    onUpdate(exerciseIndex, updated);
  };

  return (
    <div style={{ background: "#1a1a1a", borderRadius: 12, padding: 16, marginBottom: 8, borderLeft: `3px solid ${color}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>{exercise.name}</div>
          <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>{exercise.bodyPart} · {exercise.isBodyweight ? "Bodyweight" : `Target: ${exercise.targetReps} reps`}</div>
        </div>
        {!exercise.isBodyweight && suggested > 0 && (
          <div style={{ background: `${color}22`, color, fontSize: 11, padding: "3px 8px", borderRadius: 6, fontWeight: 600 }}>
            Suggested: {suggested} lb
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 1fr", gap: 6, marginBottom: 10 }}>
        <div style={{ color: "#555", fontSize: 11, fontWeight: 600 }}>SET</div>
        <div style={{ color: "#555", fontSize: 11, fontWeight: 600 }}>{exercise.isBodyweight ? "REPS" : "WEIGHT (lb)"}</div>
        <div style={{ color: "#555", fontSize: 11, fontWeight: 600 }}>REPS</div>
        {exercise.sets.map((set, si) => (
          <React.Fragment key={si}>
            <div style={{ color: "#666", fontSize: 14, display: "flex", alignItems: "center", fontWeight: 700 }}>{si + 1}</div>
            {exercise.isBodyweight ? <div /> : (
              <input type="number" value={set.weight || ""} onChange={(e) => updateSet(si, "weight", Number(e.target.value))}
                placeholder={String(suggested || "-")}
                style={{ background: "#111", border: "1px solid #333", borderRadius: 8, color: "#fff", padding: "8px 10px", fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif" }} />
            )}
            <input type="number" value={set.reps || ""} onChange={(e) => updateSet(si, "reps", Number(e.target.value))}
              placeholder={String(exercise.targetReps)}
              style={{ background: "#111", border: "1px solid #333", borderRadius: 8, color: "#fff", padding: "8px 10px", fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif" }} />
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#666", fontSize: 12 }}>How did it feel?</span>
        <StarRating value={exercise.feedback || 0} onChange={(v) => onUpdate(exerciseIndex, { ...exercise, feedback: v })} />
      </div>
    </div>
  );
};

export default function IronLog() {
  const [data, setData] = useState(() => loadData());
  const [view, setView] = useState("workout");
  const [workoutType, setWorkoutType] = useState(null);
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentExercises, setCurrentExercises] = useState([]);
  const [currentVariant, setCurrentVariant] = useState("A");
  const [saving, setSaving] = useState(false);
  const [bwInput, setBwInput] = useState("");
  const [bwDate, setBwDate] = useState(new Date().toISOString().split("T")[0]);
  const [toast, setToast] = useState(null);

  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2500); return () => clearTimeout(t); } }, [toast]);

  const showToast = (msg) => setToast(msg);

  const initWorkout = useCallback((type) => {
    if (!data) return;
    setWorkoutType(type);
    const variant = getPlanVariant(type, data.workouts);
    setCurrentVariant(variant);
    const planData = WORKOUT_PLANS[type][variant];
    const exercises = [];
    planData.supersets.forEach((ss) => {
      ss.exercises.forEach((ex) => {
        const suggested = ex.isBodyweight ? 0 : getSuggestedWeight(ex.name, ex.startWeight, data.workouts);
        const defaultReps = typeof ex.targetReps === "number" ? ex.targetReps : null;
        exercises.push({ ...ex, suggested, sets: Array.from({ length: ex.sets }, () => ({ weight: ex.isBodyweight ? null : suggested, reps: defaultReps })), feedback: 0 });
      });
    });
    const fin = planData.finisher;
    const finSuggested = fin.isBodyweight ? 0 : getSuggestedWeight(fin.name, fin.startWeight, data.workouts);
    const finDefaultReps = typeof fin.targetReps === "number" ? fin.targetReps : null;
    exercises.push({ ...fin, isFinisher: true, suggested: finSuggested, sets: Array.from({ length: fin.sets }, () => ({ weight: fin.isBodyweight ? null : finSuggested, reps: finDefaultReps })), feedback: 0 });
    setCurrentExercises(exercises);
  }, [data]);

  const updateExercise = (idx, updated) => {
    setCurrentExercises((prev) => prev.map((e, i) => (i === idx ? updated : e)));
  };

  const saveWorkout = () => {
    setSaving(true);
    const workout = {
      date: workoutDate, type: workoutType, variant: currentVariant,
      exercises: currentExercises.map((e) => ({
        name: e.name, bodyPart: e.bodyPart, targetReps: e.targetReps,
        isBodyweight: e.isBodyweight, sets: e.sets, feedback: e.feedback,
      })),
    };
    const existing = data.workouts.findIndex((w) => w.date === workoutDate && w.type === workoutType);
    let newWorkouts;
    if (existing >= 0) { newWorkouts = [...data.workouts]; newWorkouts[existing] = workout; }
    else { newWorkouts = [...data.workouts, workout]; }
    newWorkouts.sort((a, b) => a.date.localeCompare(b.date));
    const newData = { ...data, workouts: newWorkouts };
    saveData(newData);
    setData(newData);
    setSaving(false);
    showToast("Workout saved! 💪");
    setWorkoutType(null);
    setCurrentExercises([]);
  };

  const saveBodyweight = () => {
    if (!bwInput) return;
    const entry = { date: bwDate, weight: Number(bwInput) };
    const existing = data.bodyweight.findIndex((b) => b.date === bwDate);
    let newBw;
    if (existing >= 0) { newBw = [...data.bodyweight]; newBw[existing] = entry; }
    else { newBw = [...data.bodyweight, entry]; }
    newBw.sort((a, b) => a.date.localeCompare(b.date));
    const newData = { ...data, bodyweight: newBw };
    saveData(newData);
    setData(newData);
    setBwInput("");
    showToast("Weight logged! 📊");
  };

  const deleteWorkout = (date, type) => {
    const newWorkouts = data.workouts.filter((w) => !(w.date === date && w.type === type));
    const newData = { ...data, workouts: newWorkouts };
    saveData(newData);
    setData(newData);
    showToast("Workout deleted");
  };

  if (!data) return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#555", fontSize: 16 }}>Loading...</div>
    </div>
  );

  const planMeta = workoutType ? WORKOUT_PLANS[workoutType] : null;
  const planData = workoutType ? WORKOUT_PLANS[workoutType][currentVariant] : null;

  return (
    <div style={{
      background: "#0d0d0d", minHeight: "100vh", color: "#fff",
      fontFamily: "'DM Sans', sans-serif", maxWidth: 480, margin: "0 auto",
      position: "relative", paddingBottom: 80,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Bebas+Neue&display=swap" rel="stylesheet" />

      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: "#222", color: "#fff", padding: "10px 24px", borderRadius: 10,
          fontSize: 14, fontWeight: 600, zIndex: 100, boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          animation: "fadeIn 0.2s ease",
        }}>{toast}</div>
      )}

      {/* Header */}
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 3, color: "#fff" }}>IRON LOG</div>
        <div style={{ color: "#777", fontSize: 13, letterSpacing: 0.5, marginTop: 4, fontStyle: "italic" }}>Leon's Personal Training Schedule</div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", borderBottom: "1px solid #1a1a1a" }}>
        {[
          { key: "workout", label: "WORKOUT", icon: "⚡" },
          { key: "history", label: "HISTORY", icon: "📋" },
          { key: "progress", label: "PROGRESS", icon: "📈" },
        ].map((tab) => (
          <button key={tab.key}
            onClick={() => { setView(tab.key); if (tab.key !== "workout") { setWorkoutType(null); setCurrentExercises([]); } }}
            style={{
              flex: 1, padding: "12px 0", border: "none", cursor: "pointer",
              background: view === tab.key ? "#1a1a1a" : "transparent",
              color: view === tab.key ? "#fff" : "#555",
              fontSize: 11, fontWeight: 700, letterSpacing: 1,
              borderBottom: view === tab.key ? "2px solid #FF6B35" : "2px solid transparent",
              fontFamily: "'DM Sans', sans-serif",
            }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: 20 }}>

        {/* ===================== WORKOUT SELECT ===================== */}
        {view === "workout" && !workoutType && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: "#888", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>WORKOUT DATE</label>
              <input type="date" value={workoutDate} onChange={(e) => setWorkoutDate(e.target.value)}
                style={{ background: "#111", border: "1px solid #333", borderRadius: 10, color: "#fff", padding: "10px 14px", fontSize: 15, width: "100%", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif" }} />
            </div>

            <div style={{ color: "#888", fontSize: 12, fontWeight: 600, marginBottom: 12, letterSpacing: 1 }}>SELECT WORKOUT</div>

            {Object.entries(WORKOUT_PLANS).map(([key, p]) => {
              const variant = getPlanVariant(key, data.workouts);
              const sessionsOfType = data.workouts.filter((w) => w.type === key).length;
              const remaining = 4 - (sessionsOfType % 4);
              return (
                <button key={key} onClick={() => initWorkout(key)}
                  style={{
                    width: "100%", background: "#1a1a1a", border: "1px solid #2a2a2a",
                    borderRadius: 14, padding: 20, marginBottom: 12, cursor: "pointer",
                    textAlign: "left", position: "relative", overflow: "hidden",
                  }}>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: "100%", background: `linear-gradient(90deg, transparent, ${p.color}11)` }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: p.color, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>
                        {p.emoji} {p[variant].label}
                      </div>
                      <div style={{ color: "#777", fontSize: 13, marginTop: 4 }}>{p.muscles}</div>
                      <div style={{ color: "#555", fontSize: 11, marginTop: 6 }}>3 Supersets + Finisher · ~35 min · {remaining} session{remaining !== 1 ? "s" : ""} until rotation</div>
                    </div>
                    <div style={{ color: "#444", fontSize: 24 }}>→</div>
                  </div>
                </button>
              );
            })}

            {data.workouts.length > 0 && (
              <div style={{ marginTop: 20, padding: "14px 16px", background: "#111", borderRadius: 10 }}>
                <div style={{ color: "#555", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>LAST WORKOUT</div>
                <div style={{ color: "#aaa", fontSize: 14, marginTop: 4 }}>
                  {WORKOUT_PLANS[data.workouts[data.workouts.length - 1].type]?.emoji}{" "}
                  {data.workouts[data.workouts.length - 1].variant ? WORKOUT_PLANS[data.workouts[data.workouts.length - 1].type]?.[data.workouts[data.workouts.length - 1].variant]?.label : WORKOUT_PLANS[data.workouts[data.workouts.length - 1].type]?.A?.label}{" "}
                  — {formatDate(data.workouts[data.workouts.length - 1].date)}
                  {" · "}{formatNum(getVolume(data.workouts[data.workouts.length - 1]))} lb volume
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== ACTIVE WORKOUT ===================== */}
        {view === "workout" && workoutType && planData && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <button onClick={() => { setWorkoutType(null); setCurrentExercises([]); }}
                style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 14, padding: 0, fontFamily: "'DM Sans', sans-serif" }}>
                ← Back
              </button>
              <div style={{ fontSize: 12, color: "#666" }}>{formatDate(workoutDate)}</div>
            </div>

            <div style={{ textAlign: "center", marginBottom: 20, padding: "16px 0", borderBottom: `2px solid ${planMeta.color}22` }}>
              <div style={{ fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, color: planMeta.color }}>
                {planMeta.emoji} {planData.label}
              </div>
              <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>{planMeta.muscles} · Rest 45s between supersets</div>
              <div style={{
                display: "inline-block", marginTop: 8, background: `${planMeta.color}15`,
                color: planMeta.color, fontSize: 11, fontWeight: 700, padding: "4px 12px",
                borderRadius: 20, letterSpacing: 0.5,
              }}>Plan {currentVariant}</div>
            </div>

            {planData.supersets.map((ss, ssIdx) => {
              const exStartIdx = ssIdx * 2;
              return (
                <div key={ssIdx} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ background: `${planMeta.color}22`, color: planMeta.color, fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 6, letterSpacing: 1 }}>
                      SUPERSET {ss.label}
                    </div>
                    <div style={{ flex: 1, height: 1, background: "#222" }} />
                    <div style={{ color: "#444", fontSize: 11 }}>3 rounds · 45s rest</div>
                  </div>
                  <ExerciseCard exercise={currentExercises[exStartIdx]} exerciseIndex={exStartIdx} onUpdate={updateExercise} color={planMeta.color} suggested={currentExercises[exStartIdx]?.suggested} />
                  <ExerciseCard exercise={currentExercises[exStartIdx + 1]} exerciseIndex={exStartIdx + 1} onUpdate={updateExercise} color={planMeta.color} suggested={currentExercises[exStartIdx + 1]?.suggested} />
                </div>
              );
            })}

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ background: "#ff000022", color: "#ff4444", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 6, letterSpacing: 1 }}>🔥 FINISHER</div>
                <div style={{ flex: 1, height: 1, background: "#222" }} />
              </div>
              <ExerciseCard exercise={currentExercises[currentExercises.length - 1]} exerciseIndex={currentExercises.length - 1} onUpdate={updateExercise} color="#ff4444" suggested={currentExercises[currentExercises.length - 1]?.suggested} />
            </div>

            <button onClick={saveWorkout} disabled={saving}
              style={{
                width: "100%", padding: 16, background: planMeta.color, color: "#000",
                border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800,
                cursor: "pointer", fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: 2, marginTop: 8, opacity: saving ? 0.6 : 1,
              }}>
              {saving ? "SAVING..." : "💾 SAVE WORKOUT"}
            </button>
          </div>
        )}

        {/* ===================== HISTORY VIEW ===================== */}
        {view === "history" && (
          <div>
            <div style={{ color: "#888", fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 16 }}>
              WORKOUT HISTORY ({data.workouts.length} sessions)
            </div>

            {data.workouts.length === 0 && (
              <div style={{ textAlign: "center", padding: 40, color: "#444" }}>No workouts logged yet. Get after it!</div>
            )}

            {[...data.workouts].reverse().map((w, idx) => {
              const p = WORKOUT_PLANS[w.type];
              const totalSets = w.exercises.reduce((acc, e) => acc + e.sets.filter((s) => s.reps).length, 0);
              const vol = getVolume(w);
              const avgFeedback = w.exercises.filter((e) => e.feedback).length > 0
                ? (w.exercises.reduce((acc, e) => acc + (e.feedback || 0), 0) / w.exercises.filter((e) => e.feedback).length).toFixed(1) : "-";
              return (
                <div key={idx} style={{ background: "#1a1a1a", borderRadius: 12, padding: 16, marginBottom: 10, borderLeft: `3px solid ${p?.color || "#555"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: p?.color || "#fff", fontSize: 15 }}>
                        {p?.emoji} {w.variant ? p?.[w.variant]?.label : p?.A?.label}
                      </div>
                      <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>{formatDate(w.date)}</div>
                    </div>
                    <button onClick={() => deleteWorkout(w.date, w.type)}
                      style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 16, padding: 4 }}>×</button>
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                    <div>
                      <div style={{ color: "#555", fontSize: 10, fontWeight: 600 }}>SETS</div>
                      <div style={{ color: "#aaa", fontSize: 14, fontWeight: 700 }}>{totalSets}</div>
                    </div>
                    <div>
                      <div style={{ color: "#555", fontSize: 10, fontWeight: 600 }}>VOLUME</div>
                      <div style={{ color: "#aaa", fontSize: 14, fontWeight: 700 }}>{formatNum(vol)} lb</div>
                    </div>
                    <div>
                      <div style={{ color: "#555", fontSize: 10, fontWeight: 600 }}>AVG FEEL</div>
                      <div style={{ color: "#aaa", fontSize: 14, fontWeight: 700 }}>{avgFeedback} ★</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    {w.exercises.map((e, ei) => {
                      const maxW = Math.max(...e.sets.map((s) => s.weight || 0));
                      return (
                        <div key={ei} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderTop: ei > 0 ? "1px solid #222" : "none" }}>
                          <span style={{ color: "#888", fontSize: 12 }}>{e.name}</span>
                          <span style={{ color: "#666", fontSize: 12 }}>
                            {e.isBodyweight ? "BW" : `${maxW} lb`}{e.feedback ? ` · ${e.feedback}★` : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===================== PROGRESS VIEW ===================== */}
        {view === "progress" && (
          <div>
            {/* Daily Volume Chart */}
            <div style={{ marginBottom: 30 }}>
              <div style={{ color: "#888", fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>
                TOTAL VOLUME PER SESSION (lb)
              </div>
              {data.workouts.length === 0 ? (
                <div style={{ textAlign: "center", padding: 30, color: "#444" }}>Complete some workouts to see volume</div>
              ) : (() => {
                const vols = data.workouts.map((w) => ({ date: w.date, type: w.type, vol: getVolume(w), variant: w.variant || "A" }));
                const maxVol = Math.max(...vols.map((v) => v.vol), 1);
                const chartW = 400;
                const chartH = 140;
                const barW = Math.min(30, (chartW - 20) / vols.length - 4);
                const totalVol = vols.reduce((sum, v) => sum + v.vol, 0);

                return (
                  <div style={{ background: "#111", borderRadius: 10, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #222" }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ color: "#555", fontSize: 10, fontWeight: 600 }}>TOTAL</div>
                        <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{formatNum(totalVol)} lb</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ color: "#555", fontSize: 10, fontWeight: 600 }}>SESSIONS</div>
                        <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{vols.length}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ color: "#555", fontSize: 10, fontWeight: 600 }}>AVG/SESSION</div>
                        <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{formatNum(Math.round(totalVol / vols.length))} lb</div>
                      </div>
                    </div>

                    <svg viewBox={`0 0 ${chartW} ${chartH + 40}`} style={{ width: "100%", height: 180 }}>
                      {vols.map((v, i) => {
                        const x = 10 + i * ((chartW - 20) / vols.length) + ((chartW - 20) / vols.length - barW) / 2;
                        const h = maxVol > 0 ? (v.vol / maxVol) * chartH : 0;
                        const color = WORKOUT_PLANS[v.type]?.color || "#555";
                        return (
                          <g key={i}>
                            <rect x={x} y={chartH - h} width={barW} height={h} rx={3} fill={color} opacity={0.85} />
                            <text x={x + barW / 2} y={chartH - h - 6} fill="#888" fontSize="8" textAnchor="middle" fontWeight="600">
                              {formatNum(v.vol)}
                            </text>
                            {vols.length <= 14 && (
                              <>
                                <text x={x + barW / 2} y={chartH + 14} fill="#555" fontSize="7" textAnchor="middle">{v.date.slice(5)}</text>
                                <text x={x + barW / 2} y={chartH + 24} fill={color} fontSize="7" textAnchor="middle" fontWeight="600">{WORKOUT_PLANS[v.type]?.emoji}</text>
                              </>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                    <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 4 }}>
                      {Object.entries(WORKOUT_PLANS).map(([key, p]) => (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
                          <span style={{ color: "#666", fontSize: 10 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Bodyweight Section */}
            <div style={{ marginBottom: 30 }}>
              <div style={{ color: "#888", fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>BODYWEIGHT TRACKER</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input type="date" value={bwDate} onChange={(e) => setBwDate(e.target.value)}
                  style={{ flex: 1, background: "#111", border: "1px solid #333", borderRadius: 8, color: "#fff", padding: "8px 10px", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }} />
                <input type="number" value={bwInput} onChange={(e) => setBwInput(e.target.value)} placeholder="lbs"
                  style={{ width: 80, background: "#111", border: "1px solid #333", borderRadius: 8, color: "#fff", padding: "8px 10px", fontSize: 13, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }} />
                <button onClick={saveBodyweight}
                  style={{ background: "#4ECDC4", color: "#000", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Log</button>
              </div>

              {data.bodyweight.length > 0 && (() => {
                const entries = data.bodyweight;
                const weights = entries.map((e) => e.weight);
                const minW = Math.min(...weights) - 2;
                const maxW = Math.max(...weights) + 2;
                const range = maxW - minW || 1;
                const chartW = 400; const chartH = 120;
                const points = entries.map((e, i) => ({
                  x: entries.length === 1 ? chartW / 2 : (i / (entries.length - 1)) * chartW,
                  y: chartH - ((e.weight - minW) / range) * chartH,
                }));
                const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
                return (
                  <div style={{ background: "#111", borderRadius: 10, padding: 16 }}>
                    <svg viewBox={`-10 -10 ${chartW + 20} ${chartH + 30}`} style={{ width: "100%", height: 140 }}>
                      <path d={pathD} fill="none" stroke="#4ECDC4" strokeWidth="2.5" />
                      {points.map((p, i) => (
                        <g key={i}>
                          <circle cx={p.x} cy={p.y} r="4" fill="#4ECDC4" />
                          <text x={p.x} y={p.y - 10} fill="#888" fontSize="10" textAnchor="middle">{entries[i].weight}</text>
                          {entries.length <= 10 && <text x={p.x} y={chartH + 16} fill="#555" fontSize="8" textAnchor="middle">{entries[i].date.slice(5)}</text>}
                        </g>
                      ))}
                    </svg>
                    <div style={{ textAlign: "center", marginTop: 4 }}>
                      <span style={{ color: "#666", fontSize: 12 }}>
                        Start: {entries[0].weight} lb → Current: {entries[entries.length - 1].weight} lb
                        {entries.length >= 2 && (
                          <span style={{ color: entries[entries.length - 1].weight < entries[0].weight ? "#4ECDC4" : "#FF6B35", marginLeft: 8 }}>
                            ({entries[entries.length - 1].weight < entries[0].weight ? "" : "+"}{(entries[entries.length - 1].weight - entries[0].weight).toFixed(1)} lb)
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Strength Progress */}
            <div style={{ marginBottom: 30 }}>
              <div style={{ color: "#888", fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>STRENGTH PROGRESS</div>
              {data.workouts.length === 0 && <div style={{ textAlign: "center", padding: 30, color: "#444" }}>Complete some workouts to see progress</div>}
              {(() => {
                const exerciseMap = {};
                data.workouts.forEach((w) => {
                  w.exercises.forEach((e) => {
                    if (e.isBodyweight) return;
                    if (!exerciseMap[e.name]) exerciseMap[e.name] = [];
                    const maxW = Math.max(...e.sets.map((s) => s.weight || 0));
                    if (maxW > 0) exerciseMap[e.name].push({ date: w.date, weight: maxW });
                  });
                });
                return Object.entries(exerciseMap).map(([name, entries]) => {
                  if (entries.length === 0) return null;
                  const first = entries[0].weight; const last = entries[entries.length - 1].weight;
                  const change = last - first;
                  return (
                    <div key={name} style={{ background: "#1a1a1a", borderRadius: 10, padding: 14, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ color: "#ccc", fontSize: 13, fontWeight: 600 }}>{name}</div>
                        <div style={{ color: "#666", fontSize: 11, marginTop: 2 }}>{entries.length} sessions logged</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{last} lb</div>
                        {entries.length >= 2 && (
                          <div style={{ color: change > 0 ? "#4ECDC4" : change < 0 ? "#FF6B35" : "#666", fontSize: 11, fontWeight: 600 }}>
                            {change > 0 ? "+" : ""}{change} lb
                          </div>
                        )}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Reset */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => {
                  if (confirm("Reset all data? This cannot be undone.")) {
                    const fresh = { workouts: [], bodyweight: [{ date: new Date().toISOString().split("T")[0], weight: 156 }] };
                    saveData(fresh);
                    setData(fresh);
                    showToast("Data reset");
                  }
                }}
                style={{ background: "none", border: "1px solid #333", borderRadius: 8, color: "#555", padding: "8px 20px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Reset All Data
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(-10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); }
      `}</style>
    </div>
  );
}
