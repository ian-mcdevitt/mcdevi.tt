// WHERE I GOT THESE SPELLS: https://lithdoran.github.io/fiveetools/spells.html
const { spells, teleport } = require('./spells.js')

function transformSchool (school) {
    switch (school) {
        case 'A': return 'Abjuration'
        case 'C': return 'Conjuration'
        case 'D': return 'Divination'
        case 'E': return 'Enchantment'
        case 'I': return 'Illusion'
        case 'N': return 'Necromancy'
        case 'T': return 'Transmutation'
        case 'V': return 'Evocation'
    }
}

function transformAction (times) {
    return times.map((time) => { return `${time.number} ${time.unit}${time.number > 1 ? 's' : ''}` }).join(' or ')
}

function transformRange (range) {
    switch(range.type) {
        case 'cone':
        case 'cube':
        case 'radius':
        case 'line':
            return `Self (${range.distance.amount}-foot ${range.type})`
        case 'hemisphere':
        case 'sphere':
            return `Self (${range.distance.amount}-foot-radius ${range.type})`
        case 'point':
            if (range.distance.amount) {
                return `${range.distance.amount} ${range.distance.type}`
            } else {
                return range.distance.type.charAt(0).toUpperCase() + range.distance.type.slice(1)
            }
        case 'line':
        case 'special':
        default:
            return range.type.charAt(0).toUpperCase() + range.type.slice(1);
    }
}

function transformComponents (components) {
    var output = ''
    output += components.v ? 'V, ' : ''
    output += components.s ? 'S, ' : ''
    output += components.m ? `M (${components.m}), ` : ''
    return output.substring(0, output.length-2)
}

function transformDuration (duration) {
    duration = duration[0]
    switch (duration.type) {
        case 'instant':
            return 'Instantaneous'
        case 'special':
            return 'Special'
        case 'timed':
            switch (duration.duration.amount) {
                case 1:
                    return `${duration.duration.amount} ${duration.duration.type.substring(0, duration.duration.type.length-1)}`
                default:
                    return `${duration.duration.amount} ${duration.duration.type}`
            }
        case 'permanent':
            for (i in duration.ends) {
                duration.ends[i] += 'ed'
            }
            return `Until ${duration.ends.join(' or ')}`
    }
}

function transformClasses (classes) {
    var output = []
    for (c of classes.fromClassList) {
        output.push(c.name)
    }
    if(classes.fromSubclass) {
        for (subclass of classes.fromSubclass) {
            // Disregard spells that belong to a subclass whose class already has that spell
            // Disregard spells from UA and PS documents
            if (output.indexOf(subclass.class.name) !== -1 || /^(UA)|(PS)/.test(subclass.subclass.source)) { continue; }
            output.push(`${subclass.class.name} (${subclass.subclass.subSubclass || subclass.subclass.name})`)
        }
    }
    output = output.sort()
    return output.join(', ')
}

function transformDescription (entries) {
    var output = ''
    for (entry of entries) {
        if (typeof entry === 'string') {
            output += `${entry}\\n`
        } else {
            switch (entry.type) {
                case 'entries':
                    output += `<i><b>${entry.name}:</b></i> ${entry.entries.join('\\n')}\\n`
                    break
                case 'list':
                    output += `<ul><li>${entry.items.join('</li><li>')}</li></ul>`
                    break
                case 'table':
                    output += '\\n<table border=1 class="spell_table"><tr>'
                    output += `<th>${entry.colLabels.join('</th><th>')}</th>`
                    output += '</tr>'
                    for (row of entry.rows) {
                        output += `<tr><td>${row.join('</td><td>')}</td></tr>`
                    }
                    output += '</table>\\n'
                    break
            }
        }
    }
    return output.replace(/"/g, '""')
}

function transformHigherLevel (entries) {
    if (entries && entries[0] && entries[0].entries && entries[0].entries[0]) {
        return `"${entries[0].entries[0]}"`
    } else {
        return 'NULL'
    }
}

function transformSpells (spells) {
    var inserts = ['TRUNCATE TABLE spells;']
    for(var spell of spells) {
        var obj = {
            name: spell.name,
            school: transformSchool(spell.school),
            level: +spell.level,
            action: transformAction(spell.time),
            range: transformRange(spell.range).trim(),
            components: transformComponents(spell.components),
            duration: transformDuration(spell.duration),
            concentration: spell.duration[0] && spell.duration[0].concentration === true ? 'TRUE' : 'FALSE',
            classes: transformClasses(spell.classes),
            description: transformDescription(spell.entries),
            at_higher_levels: transformHigherLevel(spell.entriesHigherLevel),
            ritual: spell.meta && spell.meta.ritual === true ? 'TRUE' : 'FALSE',
            source: spell.source
        }
        if (spell.name === 'Teleport') {
            obj.description = teleport
        }
        inserts.push(`INSERT INTO spells (name, school, level, \`action\`, \`range\`, components, duration, concentration, classes, description, at_higher_levels, ritual, source) VALUES ("${obj.name}", "${obj.school}", "${obj.level}", "${obj.action}", "${obj.range}", "${obj.components}", "${obj.duration}", ${obj.concentration}, "${obj.classes}", "${obj.description}", ${obj.at_higher_levels}, ${obj.ritual}, "${obj.source}");`)
    }
    inserts.push('DELETE from spells where name LIKE \'%(UA)%\';')
    return inserts
}

console.log(transformSpells(spells).join('\n'))
