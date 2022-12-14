import React, { useState, useEffect } from "react";
import { MealPlan } from "../routes/Planner";
import Card from "./Card";
import { getWorkOut } from "../services/spoonacular";
const MEAL = ["Breakfast", "Lunch", "Dinner"];

const DayPlan = ({ day, meals, calories }: MealPlan) => {
  const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);
  const [workOut, setWorkOut] = useState<any[]>([]);
  const [workOutCalorieList, setWorkOutCalorieList] = useState<any[]>([]);
  const [workOutList, setWorkOutList] = useState<any[]>([]);
  useEffect(() => {
    getWorkOut().then((w) => {
      setWorkOut(w);
      console.log(workOut);
    });
  }, []);

  Object.keys(workOut).map((key) => {
    let sum = 0;
    for (const value of workOutCalorieList) {
      sum += Number(value);
    }
    if (sum < calories / 3) {
      workOutCalorieList.push(
        workOut[key as keyof typeof workOut].CaloriesUsed
      );
      workOutList.push(workOut[key as keyof typeof workOut]);
    }
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold underline mt-4">{capitalize(day)}</h1>
      <h2 className="text-l">Total calories: {calories}</h2>
      <div className="flex flex-row gap-4">
        {meals.map((m, i) => (
          <Card name={m.title} meal={MEAL[i]} />
        ))}
      </div>
      <h2 className="text-l font-bold">
        List of All Work Out that should be done
      </h2>
      <div className="flex flex-row gap-4 flex-wrap text-[2rem] font-bold">
        {Object.keys(workOutList).map((key) => (
          <div className=" max-w-sm rounded  overflow-hidden shadow-lg rounded-lg border border-emerald-400 hover:border-emerald-600">
            <div className="px-8 py-4 ">
              <div className="font-bold text-xl mb-2">
                <div>
                  {workOutList[key as keyof typeof workOutList].Workout}
                </div>
              </div>
              <p className="text-gray-700 text-base">
                Workout Time:{" "}
                {workOutList[key as keyof typeof workOutList].Minute} minutes
                <div>
                  Calories Burned:{" "}
                  {workOutList[key as keyof typeof workOutList].CaloriesUsed}{" "}
                  Kcal
                </div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayPlan;
