import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import porjectContext from '../../context/project/projectContext';

import classes from './Project.module.scss';

const Project = () => {
  const { getSingleProject, project } = useContext(porjectContext);

  const { projectId } = useParams();

  useEffect(() => {
    getSingleProject(projectId);
  }, [projectId]);

  return (
    <div className={classes.projectWrapper}>
      <h1>{project?.name}</h1>
      <p>{project?.description}</p>
      <div className={classes.todoWrapper}></div>
    </div>
  );
};

export default Project;
