"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STORAGE_KEY = "niclas-lernstandstest-versuche";
const NICLAS_WATERMARK = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7PDcwOyswMS4BCwsLDw4PHRERHTIoIigwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMP/AABEIAOgAtAMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAABQYDBAcCAf/EAEQQAAIBAgMEBAMFBQYEBwAAAAECAAMRBBIhMQVBUQYiYXGBEzKRobHB0RQjQlJy8BQzYnKSorLh8RYkQ3PC0v/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAxEQACAgICAgEDAgQHAAAAAAAAAQIRAyESMQQTQVEiYXGBkaGx8AVCwdHhI+HxM0L/2gAMAwEAAhEDEQA/AO4QhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIQhCEIfm5+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B+79L+4P3fpf3B//Z";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickUniqueNumbers(count, generator) {
  const items = [];
  const seen = new Set();
  while (items.length < count) {
    const task = generator();
    const key = `${task.prompt}=${task.answer}`;
    if (!seen.has(key)) {
      seen.add(key);
      items.push(task);
    }
  }
  return items;
}

function generateAdditionTasks() {
  return [
    ...pickUniqueNumbers(3, () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      return { level: "einstellig", prompt: `${a} + ${b}`, answer: a + b };
    }),
    ...pickUniqueNumbers(3, () => {
      const a = randomInt(10, 89);
      const b = randomInt(10, 89);
      return { level: "zweistellig", prompt: `${a} + ${b}`, answer: a + b };
    }),
    ...pickUniqueNumbers(3, () => {
      const a = randomInt(100, 899);
      const b = randomInt(100, 899);
      return { level: "dreistellig", prompt: `${a} + ${b}`, answer: a + b };
    }),
  ];
}

function generateSubtractionTasks() {
  return [
    ...pickUniqueNumbers(3, () => {
      const a = randomInt(4, 9);
      const b = randomInt(1, a - 1);
      return { level: "einstellig", prompt: `${a} - ${b}`, answer: a - b };
    }),
    ...pickUniqueNumbers(3, () => {
      const a = randomInt(20, 99);
      const b = randomInt(10, a - 1);
      return { level: "zweistellig", prompt: `${a} - ${b}`, answer: a - b };
    }),
    ...pickUniqueNumbers(3, () => {
      const a = randomInt(200, 999);
      const b = randomInt(100, a - 1);
      return { level: "dreistellig", prompt: `${a} - ${b}`, answer: a - b };
    }),
  ];
}

function generateMultiplicationTasks() {
  return [
    ...pickUniqueNumbers(3, () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      return { level: "einstellig", prompt: `${a} × ${b}`, answer: a * b };
    }),
    ...pickUniqueNumbers(3, () => {
      const a = randomInt(10, 40);
      const b = randomInt(2, 9);
      return { level: "zweistellig", prompt: `${a} × ${b}`, answer: a * b };
    }),
    ...pickUniqueNumbers(3, () => {
      const a = randomInt(11, 25);
      const b = randomInt(11, 19);
      return { level: "dreistellig", prompt: `${a} × ${b}`, answer: a * b };
    }),
  ];
}

function generateDivisionTasks() {
  return [
    ...pickUniqueNumbers(3, () => {
      const b = randomInt(2, 9);
      const answer = randomInt(2, 9);
      const a = b * answer;
      return { level: "einstellig", prompt: `${a} ÷ ${b}`, answer };
    }),
    ...pickUniqueNumbers(3, () => {
      const b = randomInt(2, 9);
      const answer = randomInt(10, 25);
      const a = b * answer;
      return { level: "zweistellig", prompt: `${a} ÷ ${b}`, answer };
    }),
    ...pickUniqueNumbers(3, () => {
      const divisor = randomInt(4, 9);
      const quotient = randomInt(10, 30);
      const remainder = randomInt(1, divisor - 1);
      const dividend = divisor * quotient + remainder;
      return {
        level: "dreistellig",
        prompt: `${dividend} ÷ ${divisor} (Rest)`,
        answer: `${quotient} R ${remainder}`,
      };
    }),
  ];
}

function createSections() {
  const raw = [
    { id: "addition", label: "Addition", timeLimitSec: 180, tasks: generateAdditionTasks() },
    { id: "subtraktion", label: "Subtraktion", timeLimitSec: 180, tasks: generateSubtractionTasks() },
    { id: "multiplikation", label: "Multiplikation", timeLimitSec: 240, tasks: generateMultiplicationTasks() },
    { id: "division", label: "Division", timeLimitSec: 240, tasks: generateDivisionTasks() },
  ];

  let nextId = 1;
  return raw.map((section) => ({
    ...section,
    tasks: section.tasks.map((task) => ({ ...task, id: nextId++ })),
  }));
}

function formatTime(sec) {
  const safe = Math.max(0, Number(sec) || 0);
  const m = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(safe % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function timeRating(sectionId, usedSec) {
  const rules = {
    addition: { good: 120, medium: 180 },
    subtraktion: { good: 120, medium: 180 },
    multiplikation: { good: 180, medium: 240 },
    division: { good: 180, medium: 240 },
  };
  const rule = rules[sectionId];
  if (!rule) return "mittel";
  if (usedSec <= rule.good) return "sehr gut";
  if (usedSec <= rule.medium) return "mittel";
  return "trainieren";
}

function normalizeAnswer(value) {
  return String(value ?? "")
    .trim()
    .replace(/rest/gi, "R")
    .replace(/,/g, " ")
    .replace(/\s+/g, " ")
    .toUpperCase();
}

function isCorrectAnswer(expected, actual) {
  return normalizeAnswer(expected) === normalizeAnswer(actual);
}

function evaluateSection(section, answers, elapsedSec) {
  const results = section.tasks.map((task) => {
    const userAnswer = answers[task.id] ?? "";
    const correct = isCorrectAnswer(task.answer, userAnswer);
    return {
      ...task,
      userAnswer,
      correct,
    };
  });

  const correctCount = results.filter((item) => item.correct).length;
  const errorsByLevel = {
    einstellig: results.filter((item) => item.level === "einstellig" && !item.correct).length,
    zweistellig: results.filter((item) => item.level === "zweistellig" && !item.correct).length,
    dreistellig: results.filter((item) => item.level === "dreistellig" && !item.correct).length,
  };

  return {
    sectionId: section.id,
    label: section.label,
    usedSec: elapsedSec,
    rating: timeRating(section.id, elapsedSec),
    correctCount,
    total: section.tasks.length,
    errorsByLevel,
    results,
  };
}

function buildRecommendation(sectionResult) {
  const { label, correctCount, total, rating, errorsByLevel } = sectionResult;
  const accuracy = total > 0 ? correctCount / total : 0;

  if (errorsByLevel.einstellig > 0) {
    return `${label}: Grundlagen bei einstelligen Zahlen weiter trainieren. Erst Sicherheit im Kopfrechnen, dann zu größeren Zahlen wechseln.`;
  }

  if (accuracy < 0.6) {
    return `${label}: deutlicher Trainingsbedarf. Empfehlung: eine Zahlengröße zurückgehen und systematisch üben.`;
  }

  if (errorsByLevel.zweistellig > 0 && errorsByLevel.dreistellig === 0) {
    return `${label}: zweistellige Zahlen trainieren. Dreistellige Aufgaben erst ausbauen, wenn zweistellige sicher und schnell gelöst werden.`;
  }

  if (errorsByLevel.dreistellig > 0) {
    return `${label}: dreistellige Zahlen trainieren. Die Grundidee sitzt, aber bei größeren Zahlen fehlt noch Sicherheit oder Tempo.`;
  }

  if (accuracy >= 0.85 && rating === "sehr gut") {
    return `${label}: sicher. Empfehlung: Tempo halten und mit größeren Zahlen weiterarbeiten.`;
  }

  if (rating === "trainieren") {
    return `${label}: rechnerisch gut, aber das Tempo ist noch ausbaufähig. Empfehlung: kurze Zeitübungen mit bekannten Aufgabentypen.`;
  }

  return `${label}: insgesamt ordentlich. Empfehlung: weiter auf derselben Zahlengröße üben und dann langsam steigern.`;
}

function runSelfTests() {
  const sampleSections = createSections();
  const tests = [
    {
      name: "formatTime formatiert 65 Sekunden korrekt",
      pass: formatTime(65) === "01:05",
    },
    {
      name: "normalizeAnswer akzeptiert Rest-Schreibweise",
      pass: normalizeAnswer("20 rest 3") === "20 R 3",
    },
    {
      name: "isCorrectAnswer ignoriert Groß-/Kleinschreibung und Leerzeichen",
      pass: isCorrectAnswer("20 R 3", " 20   r   3 "),
    },
    {
      name: "timeRating bewertet Addition unter 120 Sekunden als sehr gut",
      pass: timeRating("addition", 119) === "sehr gut",
    },
    {
      name: "createSections erzeugt 4 Testteile mit je 9 Aufgaben",
      pass: sampleSections.length === 4 && sampleSections.every((section) => section.tasks.length === 9),
    },
    {
      name: "Aufgaben-IDs sind eindeutig",
      pass: (() => {
        const ids = sampleSections.flatMap((section) => section.tasks.map((task) => task.id));
        return new Set(ids).size === ids.length;
      })(),
    },
    {
      name: "evaluateSection zählt richtige Antworten korrekt",
      pass: (() => {
        const result = evaluateSection(
          {
            id: "probe",
            label: "Probe",
            timeLimitSec: 10,
            tasks: [
              { id: 1, level: "einstellig", prompt: "1+1", answer: 2 },
              { id: 2, level: "zweistellig", prompt: "10+5", answer: 15 },
            ],
          },
          { 1: "2", 2: "14" },
          8
        );
        return result.correctCount === 1 && result.errorsByLevel.zweistellig === 1;
      })(),
    },
    {
      name: "buildRecommendation erkennt Grundlagenproblem bei einstelligen Zahlen",
      pass: buildRecommendation({
        label: "Addition",
        correctCount: 7,
        total: 9,
        rating: "mittel",
        errorsByLevel: { einstellig: 1, zweistellig: 0, dreistellig: 0 },
      }).includes("einstelligen Zahlen"),
    },
  ];

  return {
    passed: tests.filter((test) => test.pass).length,
    total: tests.length,
    tests,
  };
}

function getOverallText(totalCorrect) {
  if (totalCorrect < 20) {
    return "Es gibt noch deutlichen Trainingsbedarf. Am besten mit einfacheren Zahlengrößen anfangen und schrittweise steigern.";
  }
  if (totalCorrect < 30) {
    return "Ordentlicher Stand. Einzelne Rechenarten sollten gezielt trainiert werden.";
  }
  return "Sehr guter Stand. Du kannst mit größeren Zahlen und mehr Tempo weiterarbeiten.";
}

function getStars(totalCorrect, total) {
  const ratio = total > 0 ? totalCorrect / total : 0;
  if (ratio >= 0.92) return 5;
  if (ratio >= 0.8) return 4;
  if (ratio >= 0.65) return 3;
  if (ratio >= 0.45) return 2;
  if (ratio > 0) return 1;
  return 0;
}

function getLevelLabel(totalCorrect, total) {
  const stars = getStars(totalCorrect, total);
  const map = {
    0: "Start-Level",
    1: "Rechenstarter",
    2: "Zahlenforscher",
    3: "Rechenprofi",
    4: "Schnelldenker",
    5: "Zahlenmeister",
  };
  return map[stars];
}

function loadAttempts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAttempts(attempts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  } catch {
    // ignore storage errors
  }
}

export default function LernstandstestApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [sections, setSections] = useState(() => createSections());
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [remainingSec, setRemainingSec] = useState(() => createSections()[0].timeLimitSec);
  const [elapsedBySection, setElapsedBySection] = useState({});
  const [answers, setAnswers] = useState({});
  const [attempts, setAttempts] = useState([]);
  const printRef = useRef(null);

  useEffect(() => {
    setAttempts(loadAttempts());
  }, []);

  const currentSection = sections[currentSectionIndex];
  const totalTasks = useMemo(() => sections.reduce((sum, section) => sum + section.tasks.length, 0), [sections]);
  const answeredCount = Object.values(answers).filter((value) => String(value).trim() !== "").length;
  const progress = Math.round((answeredCount / totalTasks) * 100);
  const selfTests = useMemo(() => runSelfTests(), []);

  function startTest() {
    const freshSections = createSections();
    setSections(freshSections);
    setStarted(true);
    setFinished(false);
    setCurrentSectionIndex(0);
    setRemainingSec(freshSections[0].timeLimitSec);
    setElapsedBySection({});
    setAnswers({});
  }

  function resetTest() {
    const freshSections = createSections();
    setSections(freshSections);
    setStarted(false);
    setFinished(false);
    setCurrentSectionIndex(0);
    setRemainingSec(freshSections[0].timeLimitSec);
    setElapsedBySection({});
    setAnswers({});
  }

  function handleAnswerChange(taskId, value) {
    setAnswers((prev) => ({ ...prev, [taskId]: value }));
  }

  function goToNextSection(usedSecOverride) {
    const section = sections[currentSectionIndex];
    const usedSec = Math.max(0, usedSecOverride ?? section.timeLimitSec - remainingSec);

    setElapsedBySection((prev) => ({
      ...prev,
      [section.id]: usedSec,
    }));

    if (currentSectionIndex < sections.length - 1) {
      const nextIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(nextIndex);
      setRemainingSec(sections[nextIndex].timeLimitSec);
    } else {
      setFinished(true);
      setStarted(false);
    }
  }

  useEffect(() => {
    if (!started || finished) return undefined;

    const timer = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished, currentSectionIndex]);

  useEffect(() => {
    if (!started || finished || remainingSec !== 0) return;
    goToNextSection(currentSection.timeLimitSec);
  }, [remainingSec, started, finished, currentSectionIndex, currentSection]);

  const evaluation = useMemo(() => {
    if (!finished) return null;

    const sectionResults = sections.map((section) =>
      evaluateSection(section, answers, elapsedBySection[section.id] ?? section.timeLimitSec)
    );

    const totalCorrect = sectionResults.reduce((sum, result) => sum + result.correctCount, 0);
    const total = totalTasks;
    const stars = getStars(totalCorrect, total);
    const levelLabel = getLevelLabel(totalCorrect, total);

    return {
      sectionResults,
      totalCorrect,
      total,
      stars,
      levelLabel,
      recommendations: sectionResults.map(buildRecommendation),
      overall: getOverallText(totalCorrect),
    };
  }, [finished, answers, elapsedBySection, totalTasks, sections]);

  useEffect(() => {
    if (!evaluation) return;
    const attempt = {
      id: `${Date.now()}`,
      createdAt: new Date().toLocaleString("de-DE"),
      totalCorrect: evaluation.totalCorrect,
      total: evaluation.total,
      stars: evaluation.stars,
      levelLabel: evaluation.levelLabel,
      overall: evaluation.overall,
      recommendations: evaluation.recommendations,
    };
    setAttempts((prev) => {
      if (prev[0]?.id === attempt.id) return prev;
      const next = [attempt, ...prev].slice(0, 20);
      saveAttempts(next);
      return next;
    });
  }, [evaluation]);

  function printReport() {
    window.print();
  }

  function clearAttempts() {
    setAttempts([]);
    saveAttempts([]);
  }

  if (showSplash) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-slate-100 cursor-pointer"
        onClick={() => setShowSplash(false)}
      >
        <img
          src="/splash.png"
          alt="Startbild"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 p-4 md:p-8 print:bg-white">
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-card { box-shadow: none !important; border: 1px solid #cbd5e1 !important; }
        }
      `}</style>
      <div className="mx-auto max-w-6xl space-y-6" ref={printRef}>
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <Card className="print-card relative overflow-hidden rounded-3xl border-4 border-sky-200 bg-white/90 shadow-lg">
            <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center">
              <img
                src={NICLAS_WATERMARK}
                alt=""
                aria-hidden="true"
                className="h-36 w-28 rounded-3xl object-cover opacity-10 blur-[0.4px] md:h-48 md:w-36"
              />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl md:text-3xl">🌟 Niclas Lernstandstest Grundrechenarten 🌟</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4 text-sm md:text-base">
              <p>
                Willkommen! Hier kannst du Addition, Subtraktion, Multiplikation und Division üben.
                Die App erstellt bei jedem neuen Start frische Aufgaben und wertet alles automatisch aus.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full bg-sky-100 text-sky-900 hover:bg-sky-100">zufällige Aufgaben</Badge>
                <Badge className="rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100">mit Timer</Badge>
                <Badge className="rounded-full bg-emerald-100 text-emerald-900 hover:bg-emerald-100">Sterne & Level</Badge>
                <Badge className="rounded-full bg-fuchsia-100 text-fuchsia-900 hover:bg-fuchsia-100">Druckansicht</Badge>
              </div>
              <div className="flex flex-wrap gap-3 pt-2 no-print">
                <Button onClick={startTest} className="rounded-2xl bg-sky-500 text-white hover:bg-sky-600" disabled={started}>
                  ▶ Neuer Test
                </Button>
                <Button onClick={resetTest} variant="outline" className="rounded-2xl">
                  ↺ Zurücksetzen
                </Button>
                <Button onClick={printReport} variant="outline" className="rounded-2xl">
                  🖨️ PDF / Drucken
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="print-card rounded-3xl border-4 border-amber-200 bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">🎯 Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Fortschritt</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>

              <div className="rounded-3xl bg-amber-50 p-4 ring-2 ring-amber-200">
                <div className="mb-2 text-sm text-slate-700">⏱ Verbleibende Zeit</div>
                <div className="text-3xl font-bold tracking-tight text-amber-900">
                  {started && !finished ? formatTime(remainingSec) : "--:--"}
                </div>
              </div>

              <div className="text-sm text-slate-700">
                Aktueller Teil: {started && !finished ? sections[currentSectionIndex].label : "noch nicht gestartet"}
              </div>
              <div className="text-sm text-slate-700">
                Gespeicherte Versuche: <strong>{attempts.length}</strong>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="print-card rounded-3xl border-4 border-emerald-200 bg-white/90 shadow-lg no-print">
          <CardHeader>
            <CardTitle className="text-lg">🛠 Technischer Selbsttest</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>{selfTests.passed} / {selfTests.total} Prüfungen bestanden</div>
            <div className="grid gap-2 md:grid-cols-2">
              {selfTests.tests.map((test) => (
                <div key={test.name} className={`rounded-xl p-3 ring-1 ${test.pass ? "bg-emerald-50 ring-emerald-200" : "bg-rose-50 ring-rose-200"}`}>
                  <strong>{test.pass ? "OK" : "Fehler"}</strong> – {test.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {started && !finished && (
          <Card className="print-card rounded-3xl border-4 border-fuchsia-200 bg-white/95 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-4 text-2xl">
                <span>✏️ {currentSection.label}</span>
                <Badge className="rounded-full bg-fuchsia-100 text-fuchsia-900 hover:bg-fuchsia-100">{currentSection.tasks.length} Aufgaben</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {currentSection.tasks.map((task) => (
                  <div key={task.id} className="rounded-3xl border-2 border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">Aufgabe {task.id}</span>
                      <Badge variant="outline" className="rounded-full">{task.level}</Badge>
                    </div>
                    <div className="mb-3 text-2xl font-bold text-slate-800">{task.prompt} =</div>
                    <Input
                      value={answers[task.id] ?? ""}
                      onChange={(event) => handleAnswerChange(task.id, event.target.value)}
                      placeholder={task.prompt.includes("Rest") ? "z. B. 20 R 3" : "Antwort eingeben"}
                      className="rounded-2xl text-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2 no-print">
                <Button onClick={() => goToNextSection()} className="rounded-2xl bg-fuchsia-500 text-white hover:bg-fuchsia-600">
                  Nächster Teil
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {evaluation && (
          <Tabs defaultValue="ueberblick" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 rounded-3xl no-print">
              <TabsTrigger value="ueberblick">Auswertung</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="verlauf">Verlauf</TabsTrigger>
            </TabsList>

            <TabsContent value="ueberblick" className="space-y-4">
              <Card className="print-card rounded-3xl border-4 border-yellow-200 bg-white/95 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">🏆 Gesamtergebnis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">{evaluation.totalCorrect} / {evaluation.total} richtig</div>
                  <div className="text-4xl">{"⭐".repeat(evaluation.stars)}<span className="opacity-30">{"⭐".repeat(5 - evaluation.stars)}</span></div>
                  <div className="text-xl font-semibold text-slate-800">Level: {evaluation.levelLabel}</div>
                  <p className="text-slate-700">{evaluation.overall}</p>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                {evaluation.sectionResults.map((result) => (
                  <Card key={result.sectionId} className="print-card rounded-3xl border-4 border-sky-100 bg-white/95 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between gap-3 text-lg">
                        <span>{result.label}</span>
                        <Badge className="rounded-full bg-sky-100 text-sky-900 hover:bg-sky-100">{result.correctCount}/{result.total}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>Bearbeitungszeit: <strong>{formatTime(result.usedSec)}</strong></div>
                      <div>Zeitbewertung: <strong>{result.rating}</strong></div>
                      <div>Fehler einstellig: <strong>{result.errorsByLevel.einstellig}</strong></div>
                      <div>Fehler zweistellig: <strong>{result.errorsByLevel.zweistellig}</strong></div>
                      <div>Fehler dreistellig: <strong>{result.errorsByLevel.dreistellig}</strong></div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="print-card rounded-3xl border-4 border-emerald-100 bg-white/95 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">📚 Empfehlungen für das weitere Training</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {evaluation.recommendations.map((recommendation, index) => (
                    <div key={index} className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
                      {recommendation}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              {evaluation.sectionResults.map((result) => (
                <Card key={result.sectionId} className="print-card rounded-3xl border-4 border-slate-200 bg-white/95 shadow-lg">
                  <CardHeader>
                    <CardTitle>{result.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {result.results.map((task) => (
                        <div key={task.id} className={`rounded-2xl border p-4 ${task.correct ? "bg-emerald-50" : "bg-rose-50"}`}>
                          <div className="mb-1 font-medium">Aufgabe {task.id}</div>
                          <div className="mb-1">{task.prompt}</div>
                          <div>Deine Antwort: <strong>{task.userAnswer || "–"}</strong></div>
                          <div>Richtig: <strong>{String(task.answer)}</strong></div>
                          <div className="mt-2 text-sm font-semibold">{task.correct ? "richtig" : "falsch"}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="verlauf" className="space-y-4">
              <Card className="print-card rounded-3xl border-4 border-violet-200 bg-white/95 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>🗂 Gespeicherte Testversuche</span>
                    <Button onClick={clearAttempts} variant="outline" className="rounded-2xl no-print">Verlauf löschen</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {attempts.length === 0 && <div>Noch keine gespeicherten Versuche vorhanden.</div>}
                  {attempts.map((attempt) => (
                    <div key={attempt.id} className="rounded-2xl bg-violet-50 p-4 ring-1 ring-violet-200">
                      <div className="font-semibold">{attempt.createdAt}</div>
                      <div>Ergebnis: <strong>{attempt.totalCorrect} / {attempt.total}</strong></div>
                      <div>Sterne: <strong>{"⭐".repeat(attempt.stars)}</strong></div>
                      <div>Level: <strong>{attempt.levelLabel}</strong></div>
                      <div className="mt-2 text-sm text-slate-700">{attempt.overall}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
