const cyv  = require('@codefresh-io/yaml-validator');
const yaml = require('js-yaml');
const fs   = require('fs');

const doc = yaml.safeLoad(fs.readFileSync('./sample.yml', 'utf8'));
cyv(doc);
