# Auto-generated script for openKylin
# Generated from: openkylin.md
# Mirror ID: openkylin



_openkylin_install_1() {
	# Replace configuration
	set_sudo

	if [ -f /etc/apt/sources.list ]; then
		$sudo mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/openkylin_first__etc_apt_sources.list.bak ] || $sudo cp /etc/apt/sources.list ${_backup_dir}/openkylin_first__etc_apt_sources.list.bak || {
			print_error "Backup /etc/apt/sources.list failed"
			return 1
		}
		$sudo sed -i -E -e "s|https?://([^/]+)/openkylin|$http://$domain/openkylin|g" /etc/apt/sources.list || {
			print_error "Failed to update /etc/apt/sources.list"
			return 1
		}
	else
		print_warning "File /etc/apt/sources.list does not exist"
	fi

	return 0
}

_openkylin_install_2() {
	# Execute commands
	set_sudo

	# Execute commands
	$sudo apt-get update

	return 0
}

install() {

	_openkylin_install_1 || return 1
	_openkylin_install_2 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."

	# Restore files from backup
	if [ -f ${_backup_dir}/openkylin_first__etc_apt_sources.list.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/openkylin_first__etc_apt_sources.list.bak" /etc/apt/sources.list 2>/dev/null || true
		print_info "Restored /etc/apt/sources.list"
	fi

	print_success "Recovery completed"
}

can_recover() {
	# Check if any backup files exist
	[ -f ${_backup_dir}/openkylin_1_1.bak ]
}

is_deployed() {
	# Check if any replaced file contains domain variable
	[ -f /etc/apt/sources.list ] && grep -q "$domain" /etc/apt/sources.list 2>/dev/null && return 0
	return 1
}
