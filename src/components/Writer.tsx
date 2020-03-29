import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./Writer.css";

const IgnoredCharacters = [8, 46, 32, 13];

type TLevels = {
  [key: string]: number;
};

const Levels: TLevels = {
  Easy: 10,
  Normal: 5,
  Hard: 2,
};

const DefaultLevel = "Normal";

const Writer: React.FC = () => {
  const [level, setLevel] = useState(DefaultLevel);
  const [count, setCount] = useState(Levels[DefaultLevel]);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCount = Math.round((count - 0.01) * 100) / 100;

      if (newCount === 0) {
        setHasEnded(true);
      }

      if (hasStarted && !hasEnded) {
        setCount(newCount);
      }
    }, 10);
    return (): void => clearInterval(interval);
  }, [count, setCount, hasStarted, hasEnded, setHasEnded]);

  const handleKeyUp = ({ keyCode }: React.KeyboardEvent): void => {
    if (!hasStarted) {
      setHasStarted(true);
      setCount(Levels[level]);
    }

    if (IgnoredCharacters.indexOf(keyCode) !== -1) {
      return;
    }

    setCount(Levels[level]);
  };

  const moveCaretAtEnd = (e: any): void => {
    const tempValue = e.target.value;
    e.target.value = "";
    e.target.value = tempValue;
  };

  const setDifficulty = (newLevel: string): void => {
    if (!hasStarted) {
      setLevel(newLevel);
      setCount(Levels[level]);
    }
  };

  return (
    <div>
      <div className="difficulty">
        <div>Difficulty:</div>
        <p
          className={level === "Easy" ? "active" : ""}
          onClick={(): void => setDifficulty("Easy")}
        >
          Easy (10s)
        </p>
        <p
          className={level === "Normal" ? "active" : ""}
          onClick={(): void => setDifficulty("Normal")}
        >
          Normal (5s)
        </p>
        <p
          className={level === "Hard" ? "active" : ""}
          onClick={(): void => setDifficulty("Hard")}
        >
          Hard (2s)
        </p>
      </div>
      {hasStarted && <p>Seconds left: {Number(count).toFixed(2)}</p>}
      {!hasStarted && <p>Begin writing something...</p>}
      {hasEnded && <h1>DIE!</h1>}
      {hasEnded && <p>Why not share your story on the social medias?</p>}
      <TextareaAutosize
        className="writer"
        autoFocus
        onKeyUp={handleKeyUp}
        defaultValue="Once upon a time..."
        disabled={hasEnded}
        onFocus={moveCaretAtEnd}
      />

      {hasEnded && (
        <p>
          <a href="#" onClick={() => window.location.reload()}>
            Write another one.
          </a>{" "}
          Go on, you know you want to.
        </p>
      )}
    </div>
  );
};

export default Writer;
