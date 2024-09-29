import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import porjectContext from "../../context/project/projectContext";
import classes from "./AddTaskForm.module.scss";

const AddOrEditTask = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectId = searchParams.get("project_id");
  const taskId = searchParams.get("task_id");

  const statusOptions = [
    { value: 1, label: "To Do" },
    { value: 2, label: "In Progress" },
    { value: 3, label: "Done" },
  ];

  const { addTask, getSingleTask, editTask } = useContext(porjectContext);

  const [task, setTask] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      dueDate: "",
      // status: task ? task?.status : statusOptions[0],
    },
    values: {
      name: task ? task?.name : "",
      description: task ? task?.description : "",
      dueDate: task ? task?.dueDate : "",
      // status: task ? task?.status : statusOptions[0],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (taskId) {
      const getTasks = async () => {
        const response = await getSingleTask(projectId, taskId);
        setTask(response);
      };
      getTasks();
    }
  }, [projectId, taskId]);

  useEffect(() => {
    setValue("status", task?.status);
  }, [task]);

  const onSubmit = async (data) => {
    if (taskId) {
      const response = await editTask(projectId, taskId, data);
      if (response.status === 200) {
        toast.success("Task Edited!");
        navigate(`/projects/${projectId}`);
      }
    } else {
      const response = await addTask(projectId, data);
      if (response.status === 200) {
        toast.success("New Task Added!");
        navigate(`/projects/${projectId}`);
      }
    }
  };
  return (
    <>
      <h1>{taskId ? "Edit Task" : "Add Task"}</h1>
      <form className={classes.addTask} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.inputWrapper}>
          <label>Task Name</label>
          <input
            {...register("name", {
              required: "project name is required!",
              maxLength: {
                value: 20,
                message: "maximum length of allowed characters is violated",
              },
              minLength: {
                value: 3,
                message: "minimum length of allowed characters is violated",
              },
            })}
          />
          <span>{errors.name && errors?.name?.message}</span>
        </div>
        <div className={classes.inputWrapper}>
          <label>Task description</label>
          <input
            {...register("description", {
              required: "project description is required!",
              maxLength: {
                value: 50,
                message: "maximum length of allowed characters is violated",
              },
              minLength: {
                value: 3,
                message: "minimum length of allowed characters is violated",
              },
            })}
          />
          <span>{errors.description && errors?.description?.message}</span>
        </div>
        <div className={classes.inputWrapper}>
          <label>Task Due Date</label>
          <input
            {...register("dueDate", {
              required: "project Due Date is required!",
              maxLength: {
                value: 4,
                message: "maximum length of allowed characters is violated",
              },
              minLength: {
                value: 4,
                message: "minimum length of allowed characters is violated",
              },
            })}
            type="number"
          />
          <span>{errors.dueDate && errors?.dueDate?.message}</span>
        </div>
        <div className={classes.inputWrapper}>
          <label>Task Status</label>
          <Select
            id="status"
            {...register("status", {
              required: "status is required!",
            })}
            isSearchable={false}
            name="status"
            placeholder="Select Status"
            defaultValue={task ? task?.status : statusOptions[0]}
            options={statusOptions}
            onChange={(option) => {
              setValue("status", option);
            }}
            styles={{
              control: (base) => ({
                ...base,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }),
            }}
          />

          <span>{errors.status && errors?.status?.message}</span>
        </div>

        <button type="submit">{taskId ? "Edit Task" : "+ Add Task"}</button>
      </form>
    </>
  );
};

export default AddOrEditTask;
