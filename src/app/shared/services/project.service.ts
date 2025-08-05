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
      description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      image: 'assets/images/portfolio-section/screen-join.png',
       video: 'assets/videos/join-preview.mp4',
      liveUrl: 'https://stefan-helldobler.de/join/index.html',
      githubUrl: '#'
    },
    {
      id: 'el-pollo-loco',
      name: 'El Pollo Loco', 
      tech: 'JavaScript | HTML | CSS',
      description: 'A simple Jump-and-Run game based on an object-oriented approach. Help Pepe to find coins and salsa bottles to fight against the crazy hen.',
      image: 'assets/images/portfolio-section/screen-el-pollo.png',
      video: 'assets/videos/join-preview.mp4',
      liveUrl: 'https://stefan-helldobler.de/elPolloLoco/index.html',
      githubUrl: '#'
    },
    {
      id: 'pkedex',
      name: 'Pokedex',
      tech: 'HTML | JavaScript | CSS | API', 
      description: 'My personal pokedex-app showcasing my skills with fetching API.',
      image: 'assets/images/portfolio-section/screen-pokedex.png',
       video: 'assets/videos/join-preview.mp4',
      liveUrl: 'https://stefan-helldobler.de/pokedex/index.html',
      githubUrl: '#'
    }
  ];

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }
}