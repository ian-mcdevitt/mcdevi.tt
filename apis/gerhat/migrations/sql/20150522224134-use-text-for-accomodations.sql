ALTER TABLE invitations MODIFY accomodations TEXT;
ALTER TABLE invitations ADD friday varchar(255) DEFAULT NULL;
ALTER TABLE invitations ADD saturday varchar(255) DEFAULT NULL;
ALTER TABLE invitations ADD sunday varchar(255) DEFAULT NULL;
