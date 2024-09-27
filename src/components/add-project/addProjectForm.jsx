import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import porjectContext from '../../context/project/projectContext';

import classes from './AddProjectForm.module.scss';

const AddProjectForm = () => {
  const { createProject, projects, editProject } = useContext(porjectContext);

  const [selectedProject, setSelectedProject] = useState(null);

  const { projectId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    values: {
      name: projectId ? selectedProject?.name : '',
      description: projectId ? selectedProject?.description : '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  useEffect(() => {
    if (projectId) {
      const findSelectedProject = projects?.find(
        (project) => project.id === projectId
      );
      setSelectedProject(findSelectedProject);
    }
  }, [projectId]);

  const onSubmit = async (data) => {
    if (projectId) {
      await editProject(projectId, data);
    } else {
      const response = await createProject(data);

      if (response?.status === 201) {
        reset();
        setFocus('name');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
      <div className={classes.inputWrapper}>
        <label>Project Name</label>
        <input
          {...register('name', {
            required: 'project name is required!',
            maxLength: { value: 15, message: 'too much' },
          })}
        />
        <span>{errors.name && errors?.name?.message}</span>
      </div>
      <div className={classes.inputWrapper}>
        <label>Project Description</label>
        <input
          {...register('description', {
            required: 'project name is required!',
            maxLength: { value: 30, message: 'too much' },
          })}
        />
        <span>{errors.description && errors?.description?.message}</span>
      </div>
      <button type='submit'>{projectId ? 'Edit' : '+ Add'}</button>
    </form>
  );
};

export default AddProjectForm;
