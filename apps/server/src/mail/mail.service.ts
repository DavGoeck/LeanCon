import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PersistenceService } from '../persistence/persistence.service'
import { Contractor } from 'api'
import nodemailer from 'nodemailer'
import { MailerService } from '@nestjs-modules/mailer'
import { germanDate } from '../utils/date'
import { Project } from '@prisma/client'

@Injectable()
export class MailService {
    constructor(
        private prisma: PersistenceService,
        private mailClient: MailerService
    ) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async projectStarted() {
        const whereIsPublished = { where: { NOT: [ { published: null } ] }, include: { contractors: true } }
        const resetIsPublished = (id) => ({ where: { id }, data: { published: null } })
        
        const startedProjects = await this.prisma.project.findMany(whereIsPublished)
        startedProjects.forEach(async (project) => {
            const { id, contractors } = project
            await this.inform(project, contractors)
            await this.prisma.project.update(resetIsPublished(id))
        })
    }

    async inform(project: Project, contractors: Contractor[]): Promise<void> {

        // informing every single contractor is mocked
        contractors.forEach(async (contractor) => {
            const mail = await this.sendProjectStartMail(project, contractor)
            console.log("Message sent: %s", mail);
        })
    }

    async sendProjectStartMail(project: Project, contractor: Contractor) {
        const info = this.projectMailInfo(project, contractor)
        return await this.send(info)
    }

    projectMailInfo = (project: Project, contractor: Contractor) => {
        const { title } = project
        const { email, start, end } = contractor

        return {
            to: email,
            subject: `Projekt "${title}" ist gestartet!`,
            template: 'project-started',
            context: {
                title,
                start: germanDate(start),
                end: germanDate(end),
                baseUrl: 'https://leancon.goeckede.software',
                token: 'myToken'
            }
        }
    }

    async send(info) {
        return await this.mailClient.sendMail(info)
    }
}
