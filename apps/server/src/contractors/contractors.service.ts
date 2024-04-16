import { Injectable } from '@nestjs/common';
import { Contractor } from 'api';
import { v4 } from 'uuid'

@Injectable()
export class ContractorsService {

    contractors: Contractor[] = []

    getAll(projectId) {
        return this.contractors
            .filter(contractor => contractor.projectId === projectId)
    }

    create(body) {
        const contractor = { ...body, id: v4() }
        this.contractors.push(contractor)
        return contractor
    }

    remove(id) {
      const index = this.contractors.findIndex(project => project.id === id)
      if (index < 0) return null

      this.contractors  = this.contractors.filter(project => project.id !== id)

      return {}
    }

}
