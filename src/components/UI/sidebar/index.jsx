import { useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import projectContext from '../../../context/project/projectContext';

import deleteIcon from '../../../assets/images/icons/delete-icon.svg';
import editIcon from '../../../assets/images/icons/edit-icon.svg';

import classes from './Sidebar.module.scss';

const SideBar = () => {
  const { getProjects, projects, deleteProject } = useContext(projectContext);

  const navigate = useNavigate();

  const editHandler = (id) => {
    navigate(`/edit-project/${id}`);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <aside className={classes.sidebarWrapper}>
      <Link to='/add-project' className={classes.addProject}>
        + Add New Project
      </Link>
      <div className={classes.projectList}>
        {projects?.length > 0
          ? projects?.map((project) => (
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : '')}
                to={`/projects/${project.id}`}
                key={project.id}
              >
                <span className={classes.titleAndIcons}>
                  <span className={classes.title}>{project.name}</span>
                  <span className={classes.icons}>
                    <img
                      onClick={(e) => {
                        e.preventDefault();
                        editHandler(project.id);
                      }}
                      src={editIcon}
                      alt='edit icon'
                    />
                    <img
                      src={deleteIcon}
                      alt='delete icon'
                      onClick={(e) => {
                        e.preventDefault();
                        deleteProject(project.id);
                      }}
                    />
                  </span>
                </span>
                <span className={classes.description}>
                  {project.description}
                </span>
              </NavLink>
            ))
          : `Let's create a project!`}
      </div>
    </aside>
  );
};

export default SideBar;
