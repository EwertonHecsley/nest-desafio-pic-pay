import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as nodemailer from 'nodemailer';
import { MustacheService } from '../mustache/mustache.service';

@Injectable()
export class EmailService {
    constructor(
        private readonly mustacheService: MustacheService
    ) { }


}
