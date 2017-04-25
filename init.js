console.log('initializing game...');


var fs = require('fs');
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('lonewolf.db');

db.serialize(function(){
    db.run("CREATE TABLE if not exists users (username TEXT, password TEXT)");
    db.run("CREATE TABLE if not exists book_1 (page INT, type TEXT, description DESC, choices TEXT, other TEXT)");
    db.run("CREATE TABLE if not exists characters (userid INT, combat_skill INT, endurance INT)");
    db.run("CREATE TABLE if not exists levels (name TEXT)");
    db.run("CREATE TABLE if not exists kai_disciplines (name TEXT, effect_on_attribute TEXT, effect_modifier INT, effect_target TEXT)");
    db.run("CREATE TABLE if not exists weapons (name TEXT, modifier INT)");
    db.run("CREATE TABLE if not exists armors (name TEXT, modifier INT, position INT)");
    db.run("CREATE TABLE if not exists items (name TEXT, effect_on_attribute TEXT, effect_modifier INT)");
    db.run("CREATE TABLE if not exists special_items (name TEXT, effect_on_attribute TEXT, effect_modifier INT)");
    db.run("CREATE TABLE if not exists characters_levels (charactersid INT, skillsid INT)");
    db.run("CREATE TABLE if not exists characters_kai_disciplines (charactersid INT, skillsid INT)");
    db.run("CREATE TABLE if not exists characters_weapons (charactersid INT, skillsid INT)");
    db.run("CREATE TABLE if not exists characters_armors (charactersid INT, skillsid INT)");
    db.run("CREATE TABLE if not exists characters_items (charactersid INT, skillsid INT)");
    db.run("CREATE TABLE if not exists characters_special_items (charactersid INT, skillsid INT)");
    db.run("CREATE TABLE if not exists weaponskill_weapon (characterid INT, weaponid INT)");
    var stmt = db.prepare("INSERT INTO levels VALUES (?)");
    stmt.run("Novice");
    stmt.run("Intuite");
    stmt.run("Doan");
    stmt.run("Acolyte");
    stmt.run("Initiate");
    stmt.run("Aspirant");
    stmt.run("Guardian");
    stmt.run("Warmarn or Journeyman");
    stmt.run("Savant");
    stmt.run("Master");
    stmt.finalize();
    stmt = db.prepare("INSERT INTO kai_disciplines VALUES (?,?,?,?)");
    stmt.run("'Camouflage', 'hide', null, 'self'");
    stmt.run("'Hunting', 'eat', null, 'self'");
    stmt.run("'Sixth Sense', 'danger', null, 'self'");
    stmt.run("'Tracking', 'track', null, 'self'");
    stmt.run("'Healing', 'endurance', 1, 'self'");
    stmt.run("'Weaponskill', 'combat_skill', 2, 'weapons'");
    stmt.run("'Mind Shield', 'mind_force', null, 'self'");
    stmt.run("'Mind Blast', 'combat_skill', 2, 'self'");
    stmt.run("'Animal Kinship', 'animal', null, 'self'");
    stmt.run("'Mind Over Matter', 'object', null, 'self'");
    stmt.finalize();
    stmt = db.prepare("INSERT INTO weapons VALUES (?,?)");
    stmt.run("Dagger, null");
    stmt.run("Spear, null");
    stmt.run("Mace, null");
    stmt.run("Short Sword, null");
    stmt.run("Warhammer, null");
    stmt.run("Sword, null");
    stmt.run("Axe, null");
    stmt.run("Sword, null");
    stmt.run("Quarterstaff, null");
    stmt.run("Broadsword, null");
    stmt.finalize();
    stmt = db.prepare("INSERT INTO armors VALUES (?,?,?)");
    stmt.run("Helmet, 2, 1"); 
    stmt.run("Chainmail , 2, 1");
    stmt.finalize();
    stmt = db.prepare("INSERT INTO items VALUES (?,?,?)");
    stmt.run("Meal, 'endurance', 3")
    stmt.finalize();
    db.each("SELECT rowid as id, * FROM levels", function(error, row){
        console.log(row);
    });
    db.each("SELECT rowid as id, * FROM kai_disciplines", function(error, row){
        console.log(row);
    });
    db.each("SELECT rowid as id, * FROM weapons", function(error, row){
        console.log(row);
    });
});
db.close();

console.log('All process running');