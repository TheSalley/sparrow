'use client';

import React, { useState } from 'react';

type AddActivityFormProps = {
  onAddActivity: (activity: string, points: number) => void;
};

const AddActivityForm: React.FC<AddActivityFormProps> = ({ onAddActivity }) => {
  const [newActivity, setNewActivity] = useState<string>("");
  const [newPoints, setNewPoints] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newActivity && newPoints) {
      onAddActivity(newActivity, newPoints);
      setNewActivity("");
      setNewPoints(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={newActivity}
        onChange={(e) => setNewActivity(e.target.value)}
        placeholder="今天做了什么"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        value={newPoints}
        onChange={(e) => setNewPoints(Number(e.target.value))}
        placeholder="获得的积分"
        className="w-full p-2 border rounded"
      />
      <button 
        type="submit"
        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        添加
      </button>
    </form>
  );
};

export default AddActivityForm;