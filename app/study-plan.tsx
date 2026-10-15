'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { maxHours, plan, subjects, type Subject } from './plan';

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const order = (i: number) => ({ '--i': i }) as CSSProperties;

function parts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return { m, d, w: WEEK[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] };
}

function dayIndex(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d) / 86400000;
}

/** 오늘 날짜(한국 시간) — YYYY-MM-DD */
function todayKST() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function totalLabel(day: (typeof plan)[number]) {
  if (day.tasks.length === 1) return day.tasks[0].time;
  const sum = day.tasks.reduce((s, t) => s + t.hours, 0);
  return `${sum}시간`;
}

function status(today: string | null) {
  if (!today) return null;
  const next = plan.find((p) => p.exam && p.date >= today);
  if (!next || !next.exam) return { text: '시험 기간 종료', live: false };
  const diff = dayIndex(next.date) - dayIndex(today);
  return { text: `다음 시험 · ${subjects[next.exam].name} ${diff === 0 ? 'D-day' : `D-${diff}`}`, live: true };
}

export default function StudyPlan() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setToday(todayKST());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const st = status(today);
  const keys = Object.keys(subjects) as Subject[];

  return (
    <section className="block plan" id="plan" aria-labelledby="plan-title">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="title" id="plan-title" data-reveal>
            시험 기간 공부 계획
          </h2>
          <p data-reveal style={order(1)}>
            10월 15일부터 22일까지. 동역학 19일, 공업수학 2 21일, 유체역학 22일 시험에 맞춘 하루 단위 시간 배분과 목표
            진도.
          </p>
        </div>

        <div className="plan-meta" data-reveal style={order(2)}>
          <ul className="legend" aria-label="과목 색">
            {keys.map((k) => (
              <li key={k} data-s={k}>
                <i aria-hidden="true" />
                {subjects[k].name}
              </li>
            ))}
          </ul>
          <span className={`tag plan-status${st ? '' : ' wait'}`} aria-live="polite">
            {st?.live !== false && <i aria-hidden="true" />}
            {st ? st.text : '시험 일정'}
          </span>
        </div>

        <ol className="days">
          {plan.map((day, i) => {
            const { m, d, w } = parts(day.date);
            const state = !today ? undefined : day.date < today ? 'past' : day.date === today ? 'today' : 'next';
            return (
              <li
                className="day"
                key={day.date}
                data-state={state}
                data-reveal
                style={order(i)}
                aria-current={state === 'today' ? 'date' : undefined}
              >
                <div className="day-date">
                  <span className="day-num num">{d}</span>
                  <span className="day-sub">
                    {m}월 · {w}
                    {state === 'today' && <b className="today-chip">오늘</b>}
                  </span>
                  {day.exam && (
                    <span className="exam-chip" data-s={day.exam}>
                      {subjects[day.exam].name} 시험
                    </span>
                  )}
                  {day.note && <span className="day-note">{day.note}</span>}
                </div>

                <div className="day-body">
                  <div className="load" aria-label={`총 ${totalLabel(day)}`}>
                    <span className="track" aria-hidden="true">
                      {day.tasks.map((t) => (
                        <span
                          className="seg"
                          key={t.subject}
                          data-s={t.subject}
                          style={{ width: `${(t.hours / maxHours) * 100}%` }}
                        />
                      ))}
                    </span>
                    <span className="load-t num">{totalLabel(day)}</span>
                  </div>
                  <ul className="tasks">
                    {day.tasks.map((t) => (
                      <li className="task" key={t.subject} data-s={t.subject}>
                        <span className="t-sub">
                          <i aria-hidden="true" />
                          {subjects[t.subject].name}
                        </span>
                        <span className="t-time num">{t.time}</span>
                        <span className="t-goal">{t.goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
