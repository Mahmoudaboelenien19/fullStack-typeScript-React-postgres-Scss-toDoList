import React, { useEffect, useState } from "react";
import Options from "./Options";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxTypes";
import { getAllTodos } from "../redux/Taskslice";

import Task from "./Task";

const Tasks: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const disptch = useAppDispatch();

  useEffect(() => {
    disptch(getAllTodos());
    document.title = `to do`;
  }, []);

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ stiffness: 200, type: "spring", delay: 2 }}
    >
      <div className="tasks-cont">
        <Options />

        <div id="tasks">
          {tasks?.map((e, index) => {
            return <Task key={e._id!} {...e} index={index} />;
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Tasks;
