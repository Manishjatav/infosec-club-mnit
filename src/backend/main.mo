import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Core Components
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Types
  public type UserProfile = {
    name : Text;
  };

  type Event = {
    title : Text;
    description : Text;
    date : Time.Time;
    location : Text;
    eventType : Text;
    imageUrl : ?Text;
    registrationOpen : Bool;
  };

  type EventRegistration = {
    eventId : Text;
    name : Text;
    email : Text;
    branch : Text;
    year : Nat;
  };

  type BlogPost = {
    title : Text;
    content : Text;
    author : Text;
    publishedAt : Time.Time;
    tags : [Text];
    imageUrl : ?Text;
    published : Bool;
  };

  type TeamMember = {
    name : Text;
    role : Text;
    bio : Text;
    imageUrl : ?Text;
    linkedinUrl : ?Text;
    githubUrl : ?Text;
    sortOrder : Nat;
  };

  type GalleryItem = {
    caption : Text;
    blobId : ?Text;
    imageUrl : ?Text;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    read : Bool;
  };

  // Helper Modules for Comparison
  module TeamMember {
    public func compare(a : TeamMember, b : TeamMember) : Order.Order {
      Nat.compare(a.sortOrder, b.sortOrder);
    };
  };

  // State
  let userProfiles = Map.empty<Principal, UserProfile>();
  let events = Map.empty<Text, Event>();
  let registrations = Map.empty<Text, EventRegistration>();
  let blogPosts = Map.empty<Text, BlogPost>();
  let teamMembers = Map.empty<Text, TeamMember>();
  let gallery = Map.empty<Text, GalleryItem>();
  let contactMessages = Map.empty<Text, ContactMessage>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Events
  public shared ({ caller }) func createEvent(event : Event) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create events");
    };
    events.add(event.title, event);
  };

  public shared ({ caller }) func updateEvent(id : Text, event : Event) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update events");
    };
    events.add(id, event);
  };

  public shared ({ caller }) func deleteEvent(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete events");
    };
    events.remove(id);
  };

  public query ({ caller }) func getEvents() : async [Event] {
    events.values().toArray();
  };

  // Event Registrations
  public shared ({ caller }) func registerForEvent(reg : EventRegistration) : async () {
    registrations.add(reg.name.concat(reg.eventId), reg);
  };

  public query ({ caller }) func getAllRegistrations() : async [EventRegistration] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view registrations");
    };
    registrations.values().toArray();
  };

  // Blog Posts
  public shared ({ caller }) func createBlogPost(post : BlogPost) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };
    blogPosts.add(post.title, post);
  };

  public shared ({ caller }) func updateBlogPost(id : Text, post : BlogPost) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };
    blogPosts.add(id, post);
  };

  public shared ({ caller }) func deleteBlogPost(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    blogPosts.remove(id);
  };

  public query ({ caller }) func getPublishedBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().filter(func(p) { p.published });
  };

  // Team Members
  public shared ({ caller }) func addTeamMember(member : TeamMember) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add team members");
    };
    teamMembers.add(member.name, member);
  };

  public shared ({ caller }) func updateTeamMember(id : Text, member : TeamMember) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update team members");
    };
    teamMembers.add(id, member);
  };

  public shared ({ caller }) func removeTeamMember(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove team members");
    };
    teamMembers.remove(id);
  };

  public query ({ caller }) func getTeamMembers() : async [TeamMember] {
    teamMembers.values().toArray().sort();
  };

  // Gallery
  public shared ({ caller }) func addGalleryItem(item : GalleryItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add gallery items");
    };
    gallery.add(item.caption, item);
  };

  public shared ({ caller }) func removeGalleryItem(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove gallery items");
    };
    gallery.remove(id);
  };

  public query ({ caller }) func getGallery() : async [GalleryItem] {
    gallery.values().toArray();
  };

  // Contact Messages
  public shared ({ caller }) func submitContactMessage(message : ContactMessage) : async () {
    contactMessages.add(message.name.concat(message.subject), message);
  };

  public shared ({ caller }) func markMessageRead(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can mark messages as read");
    };
    switch (contactMessages.get(id)) {
      case (null) { Runtime.trap("Message not found") };
      case (?msg) {
        let updated = { msg with read = true };
        contactMessages.add(id, updated);
      };
    };
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    contactMessages.values().toArray();
  };
};
