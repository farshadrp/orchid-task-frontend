import classes from "./Tasks.module.scss";
import deleteIcon from "../../assets/images/icons/delete-icon.svg";
import editIcon from "../../assets/images/icons/edit-icon.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import porjectContext from "../../context/project/projectContext";
import { toast } from "react-toastify";
import statusFinder from "../../helper/statusFinder";

const Tasks = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { getSingleProject, project, deleteTask } = useContext(porjectContext);

  useEffect(() => {
    getSingleProject(projectId);
  }, []);

  const onDeleteHandler = async (taskId) => {
    const response = await deleteTask(projectId, taskId);
    if (response.status === 200) {
      toast.success("Task Deleted!");
      getSingleProject(projectId);
    }
  };

  const editHandler = (taskId) => {
    navigate(`/edit-task?project_id=${projectId}&task_id=${taskId}`);
  };

  return (
    <div className={classes.tasksWrapper}>
      <Link to={`/add-task?project_id=${projectId}`}>+ Add Task</Link>
      <div className={classes.tasksList}>
        {project?.tasks?.length > 0
          ? project?.tasks?.map((task) => (
              <div className={classes.task} key={task?.id}>
                <div className={classes.titleAndIcons}>
                  <span className={classes.title}>{task?.name}</span>
                  <div className={classes.icons}>
                    <img
                      onClick={() => {
                        editHandler(task?.id);
                      }}
                      src={editIcon}
                      alt="edit icon"
                    />
                    <img
                      onClick={() => {
                        onDeleteHandler(task?.id);
                      }}
                      src={deleteIcon}
                      alt="delete icon"
                    />
                  </div>
                </div>
                <div className={classes?.taskDetails}>
                  <p className={classes.description}>{task?.description}</p>
                  <div>
                    <span>Status: {task?.status?.label}</span>
                    <span>Due Data: {task?.dueDate}</span>
                  </div>
                </div>
              </div>
            ))
          : `Let's create a Tasks!`}
      </div>
    </div>
  );
};

export default Tasks;
