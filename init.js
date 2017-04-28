console.log('initializing game...');


var fs = require('fs');
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('lonewolf.db');

db.serialize(function(){
    db.run("CREATE TABLE if not exists users (username TEXT, password TEXT)");
    db.run("CREATE TABLE if not exists books (book INT, page INT, type TEXT, description TEXT, other TEXT)");
    db.run("CREATE TABLE if not exists books_choices (book INT, page INT, book_choice INT, page_choice INT, condition TEXT, description TEXT)");
    db.run("CREATE TABLE if not exists characters (userid INT, combat_skill INT, endurance INT, gold_crown INT)");
    db.run("CREATE TABLE if not exists levels (name TEXT)");
    db.run("CREATE TABLE if not exists kai_disciplines (name TEXT, effect_on_attribute TEXT, effect_modifier INT, effect_target TEXT)");
    db.run("CREATE TABLE if not exists weapons (name TEXT, modifier INT)");
    db.run("CREATE TABLE if not exists special_items (name TEXT, modifier INT, position TEXT)");
    db.run("CREATE TABLE if not exists items (name TEXT, effect_on_attribute TEXT, effect_modifier INT)");
    db.run("CREATE TABLE if not exists characters_levels (characterid INT, levelid INT)");
    db.run("CREATE TABLE if not exists characters_kai_disciplines (charactersid INT, disciplineid INT)");
    db.run("CREATE TABLE if not exists characters_weapons (characterid INT, we aponid INT)");
    db.run("CREATE TABLE if not exists characters_items (characterid INT, itemid INT)");
    db.run("CREATE TABLE if not exists characters_special_items (characterid INT, )");
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
    stmt = db.prepare("INSERT INTO special_items VALUES (?,?,?)");
    stmt.run("Helmet, 2, head"); 
    stmt.run("Chainmail , 2, body");
    stmt.finalize();
    stmt = db.prepare("INSERT INTO items VALUES (?,?,?)");
    stmt.run("Meal, 'endurance', 3");
    stmt.run("'Healing Potion', 'endurance', 4");
    stmt.finalize();
    stmt.prepare("INSERT INTO books VALUES (?,?,?,?,?,?)");
    stmt.run("1, 1, adventure, "
        +"'You must make haste for you sense it is not safe to linger by the smoking remains of the ruined monastery."
        +"', ");
    stmt.finalize();
    stmt.prepare("INSERT INTO books_choices VALUES (?,?,?,?,?)");
    stmt.run("1,1,1,85, null, 'If you wish to take the right path into the wood...'");
    stmt.run("1,1,1,141, 'kai_discipline:Sixth Sense', 'If you wish to use the Kai Discipline of Sixth Sense...'");
    stmt.run("1,1,1,275, null, 'If you wish to follow the left track'");
    stmt.run("1,2,1,276, 'random : 5-9', 'random'");
    stmt.run("1,2,1,343, 'random : 0-4', 'random'");
    stmt.run("1,3,1,196, null");
    stmt.run("1,3,1,144, null");
    stmt.run("1,4,1,218, 'kai_discipline:Sixth Sense'");
    stmt.run("1,4,1,75, null");
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