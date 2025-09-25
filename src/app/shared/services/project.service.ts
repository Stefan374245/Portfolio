import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 'join',
      name: 'Join',
      tech: 'Angular | TypeScript | HTML | CSS | Firebase',
      descriptionKey: 'projects.join.description',
      image: 'assets/images/portfolio-section/screen-join.png',
       video: 'assets/videos/join-preview.mp4',
      liveUrl: 'https://join.stefan-helldobler.de/',
      githubUrl: 'https://github.com/Stefan374245/Join-Taskmanagement.git'
    },
    {
      id: 'el-pollo-loco',
      name: 'El Pollo Loco', 
      tech: 'JavaScript | HTML | CSS',
      descriptionKey: 'projects.elPolloLoco.description',
      image: 'assets/images/portfolio-section/screen-el-pollo.png',
      video: 'assets/videos/el-pollo-loco-preview.mp4',
      liveUrl: 'https://elPolloLoco.stefan-helldobler.de',
      githubUrl: 'https://github.com/Stefan374245/El-pollo-loco.git'
    },
    {
      id: 'pokedex',
      name: 'Pokedex',
      tech: 'HTML | JavaScript | CSS | API', 
      descriptionKey: 'projects.pokedex.description',
      image: 'assets/images/portfolio-section/screen-pokedex.png',
       video: 'assets/videos/pokedex-preview.mp4',
      liveUrl: 'https://pokedex.stefan-helldobler.de',
      githubUrl: 'https://github.com/Stefan374245/pok-dex-project.git'
    }
  ];

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }
}